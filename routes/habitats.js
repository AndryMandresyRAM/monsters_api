const { Router } = require('express');
const pool = require('../db/index');

const router = Router();

router.get('/', (request, response, next)=>{
    pool.query('SELECT * FROM habitats ORDER BY id ASC', (err, res)=>{
        if (err) return next(err);
        response.json(res.rows);
    })
})

router.put('/:id', (request, response, next)=>{
    const { id } = request.params;
    const keys = ['name', 'climate', 'temperature'];

    const fields = [];

    keys.forEach(key=>{
        if(request.body[key]) fields.push(key)
    });

    fields.forEach((field, index)=>{
        pool.query(`UPDATE habitats SET ${field}=($1) WHERE id=($2)`,
        [request.body[field], id],
        (err, res)=>{
            if (err) return next(err);
            if (index === fields.length-1) response.redirect('/habitats');
        }
        );
    });
});

module.exports = router;