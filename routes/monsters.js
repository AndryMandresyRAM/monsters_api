const {Router} = require('express');
const pool = require('../db/index');
const router = Router();

router.get('/', (request, response, next)=>{
    pool.query("SELECT * FROM monsters ORDER BY id ASC", (err, res)=>{
        if (err) return next(err);

        response.json(res.rows);
    })
});

router.get('/:id', (request, response, next)=>{
    const {id} = request.params;
    pool.query(`SELECT * FROM monsters WHERE id = $1`, [id], (err, res)=>{
        if(err) return next(err);

        response.json(res.rows);
    })
});

router.post('/', (request, response, next)=>{
    const {name, personnality} = request.body;

    pool.query('INSERT INTO monsters (name, personnality) VALUES ($1, $2)', [name, personnality], (err, res)=>{
        if (err) return next(err);

        response.redirect('/monsters');
    })
});

/*router.put('/:id', (request, response, next)=>{
    const {id} = request.params;
    const {name, personnality} = request.body;
    pool.query('UPDATE monsters SET name = ($1), personnality = ($2) WHERE id = ($3)', [name, personnality, id], (err, res)=>{
        if (err) return next(err);

        response.redirect('/monsters');
    })
});*/

router.put('/:id', (request, response, next)=>{
    const {id} = request.params;

    const keys = ['name', 'personnality'];

    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    fields.forEach((field, index) => {
        pool.query(
            `UPDATE monsters SET ${field} = ($1) WHERE id = ($2)`,
            [request.body[field], id],
            (err, res) => {
                if (err) return next(err);
                if (index === fields.length-1) response.redirect('/monsters');
            }
        )
    });
});

router.delete('/:id', (request, response, next)=>{
    const {id} = request.params;
    pool.query('DELETE FROM monsters WHERE id = ($1)', [id], (err, res)=>{
        if (err) return next(err);

        response.redirect('/monsters');
    });
});

module.exports=router;