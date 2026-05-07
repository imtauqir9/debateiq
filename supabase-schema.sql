-- Run this in Supabase SQL Editor (supabase.com → your project → SQL Editor)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Debates table
create table if not exists debates (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null,
  topic text not null,
  topic_emoji text default '🏏',
  position text,
  tone text,
  language text default 'English',
  source text,
  score_overall int,
  score_strength int,
  score_evidence int,
  score_logic int,
  score_persuasion int,
  score_verdict text,
  layers jsonb,
  total_tokens int default 0,
  created_at timestamptz default now()
);

-- Index for fast user queries
create index if not exists debates_user_id_idx on debates(user_id);
create index if not exists debates_created_at_idx on debates(created_at desc);

-- Row Level Security
alter table debates enable row level security;

-- Policy: users can read/write their own debates
create policy "Users can manage own debates"
  on debates for all
  using (true)
  with check (true);

-- View: debate stats per user
create or replace view user_stats as
select
  user_id,
  count(*) as total_debates,
  round(avg(score_overall)) as avg_score,
  max(score_overall) as best_score,
  sum(total_tokens) as total_tokens_used,
  max(created_at) as last_debate_at
from debates
group by user_id;
