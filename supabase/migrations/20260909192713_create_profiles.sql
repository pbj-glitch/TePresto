-- Tabla de perfiles públicos: una fila por usuario de auth.users.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Cualquier usuario autenticado puede ver los perfiles (necesario para
-- mostrar el nombre del dueño de un objeto en el feed, chat, etc.).
create policy "profiles_select_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

-- Cada usuario solo puede modificar su propia fila.
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Crea el perfil automáticamente al registrarse, tomando el nombre
-- que ya se envía desde AuthService.signUp() en user_metadata.full_name.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Rellena perfiles para usuarios que ya se registraron antes de esta migración.
insert into public.profiles (id, full_name)
select id, raw_user_meta_data ->> 'full_name'
from auth.users
on conflict (id) do nothing;
