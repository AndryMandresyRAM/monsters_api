#!/bin/bash

database = "monstersdb"

dropdb -U node_user $monstersdb
createdb -U node_user $monstersdb

psql -U node_user monstersdb < ./bin/sql/monsters.sql