-- ============================================================
-- Auto-create public.users on auth.users signup
-- Set defaults for native_lang / cefr_level
-- ============================================================

-- set defaults
ALTER TABLE public.users
  ALTER COLUMN native_lang SET DEFAULT 'ja';

ALTER TABLE public.users
  ALTER COLUMN cefr_level SET DEFAULT 'A1';

-- auth.users INSERT → public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    name,
    photo_url,
    native_lang,
    cefr_level
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data ->> 'name',
      NEW.raw_user_meta_data ->> 'full_name',
      split_part(NEW.email, '@', 1)
    ),
    NEW.raw_user_meta_data ->> 'avatar_url',
    'ja', 
    'A1'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();