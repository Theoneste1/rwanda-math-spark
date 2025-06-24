
-- Create users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Problems table
CREATE TABLE problems (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  images TEXT[],
  topic VARCHAR(50) CHECK (topic IN ('Combinatorics', 'Number Theory', 'Geometry', 'Other Olympiad')),
  difficulty VARCHAR(20) CHECK (difficulty IN ('Juniors', 'Seniors', 'PAMO', 'IMO')),
  privacy VARCHAR(10) CHECK (privacy IN ('Public', 'Private')) DEFAULT 'Public',
  suggested_answer TEXT,
  creator_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Comments table (supports nested replies)
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  creator_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Answers table
CREATE TABLE answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  creator_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reactions table (for problems, comments, and answers)
CREATE TABLE reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  target_type VARCHAR(10) CHECK (target_type IN ('Problem', 'Comment', 'Answer')),
  target_id UUID NOT NULL,
  emoji VARCHAR(20) CHECK (emoji IN ('like', 'love', 'laugh', 'smile', 'upvote', 'downvote')),
  creator_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(target_type, target_id, creator_id, emoji)
);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Problems policies
CREATE POLICY "Anyone can view public problems" ON problems FOR SELECT USING (privacy = 'Public' OR auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can create problems" ON problems FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can update own problems" ON problems FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Users can delete own problems" ON problems FOR DELETE USING (auth.uid() = creator_id);

-- Comments policies
CREATE POLICY "Anyone can view comments on public problems" ON comments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM problems 
    WHERE problems.id = comments.problem_id 
    AND (problems.privacy = 'Public' OR auth.uid() IS NOT NULL)
  )
);
CREATE POLICY "Authenticated users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = creator_id);

-- Answers policies
CREATE POLICY "Anyone can view answers on public problems" ON answers FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM problems 
    WHERE problems.id = answers.problem_id 
    AND (problems.privacy = 'Public' OR auth.uid() IS NOT NULL)
  )
);
CREATE POLICY "Authenticated users can create answers" ON answers FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can update own answers" ON answers FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Users can delete own answers" ON answers FOR DELETE USING (auth.uid() = creator_id);

-- Reactions policies
CREATE POLICY "Anyone can view reactions" ON reactions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reactions" ON reactions FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can delete own reactions" ON reactions FOR DELETE USING (auth.uid() = creator_id);

-- Functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_problems_updated_at BEFORE UPDATE ON problems
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, username, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
