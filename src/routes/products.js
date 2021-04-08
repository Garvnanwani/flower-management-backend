
const express = require('express');
const router = express.Router();
const db = require('../db');

/* get method for fetch all products. */
router.get('/', async (req, res) => {

    try {


    } catch (err) {



    }




});

/*get method for fetch single product*/
router.get('/:id', async (req, res) => {

    try {


    } catch (err) {



    }




});

/*post method for create product*/
router.post('/create', async (req, res) => {
    try {

    } catch (err) {

    }


});

/*put method for update product*/
router.put('/update/:id', async (req, res) => {

    try {


    } catch (err) {



    }
});

/*delete method for delete product*/
router.delete('/delete/:id', async (req, res) => {

    try {


    } catch (err) {



    }
});

module.exports = router;
