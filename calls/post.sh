#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d @post1.json http://localhost:1234/items
curl -X POST -H "Content-Type: application/json" -d @post2.json http://localhost:1234/items