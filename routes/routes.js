const express = require('express');
const router = express.Router()
module.exports = router;
const modeloTarefa = require('../models/tarefa');

//ENVIA PARA O BANCO
router.post('/post', async (req, res) => {
    const objetoTarefa = new modeloTarefa({
    descricao: req.body.descricao,
    statusRealizada: req.body.statusRealizada
    })
    try {
        const tarefaSalva = await objetoTarefa.save();
        res.status(200).json(tarefaSalva)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//APAGA UMA TAREFA BASEADA NO ID
router.delete('/delete/:id', async (req, res) => {
    try {
    const resultado = await modeloTarefa.findByIdAndDelete(req.params.id)
    res.json(resultado)
    }
    catch (error) {
    res.status(400).json({ message: error.message })
    }
})

//APAGA TODAS AS TAREFAS
router.delete('/removeAll', async (req, res) => {
    try {
    const resultado = await modeloTarefa.deleteMany()
    res.json(resultado)
    }
    catch (error) {
    res.status(400).json({ message: error.message })
    }
})

   
//ATUALIZA UMA TAREFA BASEADA NO ID
router.patch('/update/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const novaTarefa = req.body;
    const options = { new: true };
    const result = await modeloTarefa.findByIdAndUpdate(
    id, novaTarefa, options
    )
    res.json(result)
    }
    catch (error) {
    res.status(400).json({ message: error.message })
    }
})

//PUXA TODAS AS ENTRADAS DO BANCO
router.get('/getAll', async (req, res) => {
    try {
    const resultados = await modeloTarefa.find();
    res.json(resultados)
    }
    catch (error) {
    res.status(500).json({ message: error.message })
    }
})

//PUXA TODAS AS ENTRADAS CONCLUIDAS
router.get('/getAllDone', async (req, res) => {
    try {
    const resultados = await modeloTarefa.find({'statusRealizada': true});
    res.json(resultados)
    }
    catch (error) {
    res.status(500).json({ message: error.message })
    }
})

//PUXA TODAS AS ENTRADAS NAO CONCLUIDAS
router.get('/getAllDone', async (req, res) => {
    try {
    const resultados = await modeloTarefa.find({'statusRealizada': false});
    res.json(resultados)
    }
    catch (error) {
    res.status(500).json({ message: error.message })
    }
})

//PUXA ENTRADAS COM DESCRICOES CORRESPONDENTES
router.get('/encontrarDescricao/:pedaco', async (req, res) => {
    try {
        const descricao = req.params.pedaco;
         const resultados = await modeloTarefa.find({'descricao': RegExp(descricao ,'i')});
         res.json(resultados)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

const senha = 2863;