const {Router} = require('express');
const pool = require('../db/index');

const router = Router();

router.get('/', (request, response, next)=>{
    pool.query('SELECT * FROM lives ORDER BY id ASC', (err, res)=>{
        if (err) return next(err);
        response.json(res.rows);
    })
});

router.get('/conditions', (request, response, next)=>{
    pool.query('SELECT * FROM lives l JOIN habitats h ON h.id=l.habitats_id', 
    (err, res)=>{
        if(err) return next(err);

        response.json(res.rows);
    })
})

module.exports=router;