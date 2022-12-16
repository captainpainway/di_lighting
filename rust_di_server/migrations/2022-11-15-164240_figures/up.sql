CREATE TABLE public.figures (
	tag text NOT NULL,
	name text NULL,
	base_r int4 NULL,
	base_g int4 NULL,
	base_b int4 NULL,
	light_program text NULL,
	CONSTRAINT figures_pkey PRIMARY KEY (tag)
);