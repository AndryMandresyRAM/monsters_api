CREATE TABLE monsters(
    id serial,
    name character varying(50),
    personnality character varying(50)
);


CREATE TABLE habitats(
    id serial,
    name character varying (50),
    climate character varying (50),
    temperature int
);

CREATE TABLE lives(
    monsters_id int,
    habitats_id int
);

INSERT INTO monsters(name, personnality)
VALUES
('Dragon', 'angry'),
('Rusty', 'passionate');

INSERT INTO habitats(name, climate, temperature)
VALUES
('desert', 'dry', 100),
('forrest', 'haunted', 70);


INSERT INTO lives(monsters_id, habitats_id)
VALUES
(1,2),
(2,1);