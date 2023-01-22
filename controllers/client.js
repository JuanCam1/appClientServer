const { response, request } = require('express');
const pool = require('../database/config');

const getClientsAll = async (req = request, res = response) => {
  try {
    const [rows] = await pool.query('select * from clientes');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

const getClientById = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      msg: 'El es id del ccliente es requerido',
    });
  } else {
    try {
      const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [
        id,
      ]);

      if (rows.length === 0) {
        res.status(400).json({
          msg: 'El id recibido no existe',
        });
      } else {
        res.json(rows[0]);
      }
    } catch (err) {
      res.status(400).json({
        msg: 'El id recibido es incorrecto',
      });
    }
  }
};

const createClient = async (req, res) => {
  try {
    const { id, name, empresa, email, notas } = req.body;
    const [rows] = await pool.query(
      'INSERT INTO clientes (id, name, empresa, email, notas) VALUES (?, ?, ?, ?, ?)',
      [id, name, empresa, email, notas]
    );

    console.log(rows);
    res.status(201).json({ message: 'correct' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, empresa, email, notas } = req.body;

    const [result] = await pool.query(
      'UPDATE clientes SET name = IFNULL(?, name), empresa = IFNULL(?, empresa), email = IFNULL(?, email), notas = IFNULL(?, notas) WHERE id = ?',
      [name, empresa, email, notas, id]
    );

    console.log(result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const [rows] = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);

    console.log(rows.affectedRows);
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

module.exports = {
  getClientsAll,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
