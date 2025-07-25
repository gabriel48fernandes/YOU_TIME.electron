PGDMP      1                }            you_time    16.9    16.9 *    B           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            C           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            D           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            E           1262    16478    you_time    DATABASE        CREATE DATABASE you_time WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE you_time;
                postgres    false            �            1259    16494    agenda_disponivel    TABLE     �   CREATE TABLE public.agenda_disponivel (
    id integer NOT NULL,
    data date NOT NULL,
    hora time without time zone NOT NULL,
    disponivel boolean DEFAULT true
);
 %   DROP TABLE public.agenda_disponivel;
       public         heap    postgres    false            �            1259    16493    agenda_disponivel_id_seq    SEQUENCE     �   CREATE SEQUENCE public.agenda_disponivel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.agenda_disponivel_id_seq;
       public          postgres    false    220            F           0    0    agenda_disponivel_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.agenda_disponivel_id_seq OWNED BY public.agenda_disponivel.id;
          public          postgres    false    219            �            1259    16502    agendamentos    TABLE     �   CREATE TABLE public.agendamentos (
    id integer NOT NULL,
    idcliente integer,
    idservico integer,
    idagenda integer,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
     DROP TABLE public.agendamentos;
       public         heap    postgres    false            �            1259    16501    agendamentos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.agendamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.agendamentos_id_seq;
       public          postgres    false    222            G           0    0    agendamentos_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.agendamentos_id_seq OWNED BY public.agendamentos.id;
          public          postgres    false    221            �            1259    16480    cliente    TABLE     �   CREATE TABLE public.cliente (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    telefone character varying(20),
    email character varying(100)
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    16479    cliente_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.cliente_id_seq;
       public          postgres    false    216            H           0    0    cliente_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.cliente_id_seq OWNED BY public.cliente.id;
          public          postgres    false    215            �            1259    16487    servicos    TABLE     �   CREATE TABLE public.servicos (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    preco numeric(10,2) NOT NULL,
    duracao_minutos integer NOT NULL
);
    DROP TABLE public.servicos;
       public         heap    postgres    false            �            1259    16486    servicos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.servicos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.servicos_id_seq;
       public          postgres    false    218            I           0    0    servicos_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.servicos_id_seq OWNED BY public.servicos.id;
          public          postgres    false    217            �            1259    16525    usuario    TABLE     �   CREATE TABLE public.usuario (
    id integer NOT NULL,
    username text,
    password text,
    perfil text,
    idcliente integer
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    16524    usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    224            J           0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    223            �           2604    16497    agenda_disponivel id    DEFAULT     |   ALTER TABLE ONLY public.agenda_disponivel ALTER COLUMN id SET DEFAULT nextval('public.agenda_disponivel_id_seq'::regclass);
 C   ALTER TABLE public.agenda_disponivel ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    16505    agendamentos id    DEFAULT     r   ALTER TABLE ONLY public.agendamentos ALTER COLUMN id SET DEFAULT nextval('public.agendamentos_id_seq'::regclass);
 >   ALTER TABLE public.agendamentos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    16483 
   cliente id    DEFAULT     h   ALTER TABLE ONLY public.cliente ALTER COLUMN id SET DEFAULT nextval('public.cliente_id_seq'::regclass);
 9   ALTER TABLE public.cliente ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    16490    servicos id    DEFAULT     j   ALTER TABLE ONLY public.servicos ALTER COLUMN id SET DEFAULT nextval('public.servicos_id_seq'::regclass);
 :   ALTER TABLE public.servicos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    16528 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            ;          0    16494    agenda_disponivel 
   TABLE DATA           G   COPY public.agenda_disponivel (id, data, hora, disponivel) FROM stdin;
    public          postgres    false    220   t.       =          0    16502    agendamentos 
   TABLE DATA           U   COPY public.agendamentos (id, idcliente, idservico, idagenda, criado_em) FROM stdin;
    public          postgres    false    222   �.       7          0    16480    cliente 
   TABLE DATA           <   COPY public.cliente (id, nome, telefone, email) FROM stdin;
    public          postgres    false    216   /       9          0    16487    servicos 
   TABLE DATA           D   COPY public.servicos (id, nome, preco, duracao_minutos) FROM stdin;
    public          postgres    false    218   �/       ?          0    16525    usuario 
   TABLE DATA           L   COPY public.usuario (id, username, password, perfil, idcliente) FROM stdin;
    public          postgres    false    224   #0       K           0    0    agenda_disponivel_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.agenda_disponivel_id_seq', 5, true);
          public          postgres    false    219            L           0    0    agendamentos_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.agendamentos_id_seq', 8, true);
          public          postgres    false    221            M           0    0    cliente_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.cliente_id_seq', 6, true);
          public          postgres    false    215            N           0    0    servicos_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.servicos_id_seq', 6, true);
          public          postgres    false    217            O           0    0    usuario_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.usuario_id_seq', 5, true);
          public          postgres    false    223            �           2606    16500 (   agenda_disponivel agenda_disponivel_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.agenda_disponivel
    ADD CONSTRAINT agenda_disponivel_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.agenda_disponivel DROP CONSTRAINT agenda_disponivel_pkey;
       public            postgres    false    220            �           2606    16508    agendamentos agendamentos_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.agendamentos
    ADD CONSTRAINT agendamentos_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.agendamentos DROP CONSTRAINT agendamentos_pkey;
       public            postgres    false    222            �           2606    16485    cliente cliente_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    216            �           2606    16492    servicos servicos_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.servicos
    ADD CONSTRAINT servicos_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.servicos DROP CONSTRAINT servicos_pkey;
       public            postgres    false    218            �           2606    16532    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    224            �           2606    16519 '   agendamentos agendamentos_idagenda_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.agendamentos
    ADD CONSTRAINT agendamentos_idagenda_fkey FOREIGN KEY (idagenda) REFERENCES public.agenda_disponivel(id);
 Q   ALTER TABLE ONLY public.agendamentos DROP CONSTRAINT agendamentos_idagenda_fkey;
       public          postgres    false    222    4767    220            �           2606    16509 (   agendamentos agendamentos_idcliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.agendamentos
    ADD CONSTRAINT agendamentos_idcliente_fkey FOREIGN KEY (idcliente) REFERENCES public.cliente(id);
 R   ALTER TABLE ONLY public.agendamentos DROP CONSTRAINT agendamentos_idcliente_fkey;
       public          postgres    false    222    4763    216            �           2606    16514 (   agendamentos agendamentos_idservico_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.agendamentos
    ADD CONSTRAINT agendamentos_idservico_fkey FOREIGN KEY (idservico) REFERENCES public.servicos(id);
 R   ALTER TABLE ONLY public.agendamentos DROP CONSTRAINT agendamentos_idservico_fkey;
       public          postgres    false    4765    218    222            ;   F   x�3�4202�50�54�4��20 "�.�������1T��ތ�����C����T<�+F��� ��,      =   B   x�5���0�7Taa.@���_��ᾗ2���`�`^D�z����:�O���WV����u����c�      7   z   x�3���?�8_!83�,����,��3+?1�!5713G/9?�ˈ�%�4='�X!8��
���8S 2H�M8���R3s�R���RR����[ZX�qr�q����q�ZXXB�\1z\\\ ��*�      9   m   x�3�tJ,JJ�46�30�42�2�t�/*IU�V�H��%L�L�)��E�)����P	C�DrbqibP$nl�e��A!/Q�8#�,�����̀��5�$$�Jc���� _�-�      ?   D   x�3���O��442�,-N-�4�2�L�/M�I,Fq�p�'&e��p�XX�p&��r��q��qqq u3a     