import express, { Router } from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();
// create books here 

router.post('', async (req, res) => {
    try{
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'send all required fields: title, author, publisherYear',
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook)
        return res.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// list all books routes
router.get('', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({data: books})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// show book record 
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

// routes for updating bookstore record

router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({message: "send all required fields: title author and publish yer"});
        }
        const {id} = req.params
        const book = await Book.findByIdAndUpdate(id, req.body);
        if (!book){
            return res.status(404).json({message: "record not found"});
        }
        return res.status(200).send({ message: "Book updated successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});   
    }
});

// deleting record form the bookstore

router.delete('/:id', async (req, res) =>{
    try {
        const {id} = req.params
        const book = await Book.findByIdAndDelete(id)

        if (!book){
            return res.status(404).json({message: "book not found"})
        }
        return res.status(200).send({message: "Book deleted seccessfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;