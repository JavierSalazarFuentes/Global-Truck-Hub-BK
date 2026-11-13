const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Endpoint para obtener el catálogo completo
app.get('/api/catalogo', (req, res) => {
    // Lee el archivo datos.json
    fs.readFile(path.join(__dirname, 'datos.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer los datos' });
        }
        const jsonData = JSON.parse(data);

        // Convierte los datos a una cadena y lo envia al navegador
        res.json(jsonData.catalogo);
    });
});

// Ruta para el Login de usuarios
app.post('/api/login', (req, res) => {
    const { usuario, password } = req.body;

    // Lee tu archivo usuarios.json
    fs.readFile('./usuarios.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error interno en el servidor' });
        }
        // Convierte el contenido del archivo a un objeto JavaScript
        const usuarios = JSON.parse(data);

        // Busca si coincide el usuario y la contraseña
        const userFound = usuarios.find(
            (u) => u.usuario === usuario && u.password === password
        );

        // Si se encuentra el usuario, generamos el JWT y devolvemos los datos
        if (userFound) {
            // Generamos el token JWT
            const token = jwt.sign(
                { usuario: userFound.usuario, rol: userFound.rol },
                process.env.JWT_SECRET || 'secreto_temporal',
                { expiresIn: '1h' }
            );

            res.json({
                success: true,
                mensaje: 'Login exitoso',
                token: token, // <--- ¡Aquí enviamos el JWT generado!
                usuario: { nombre: userFound.nombre, rol: userFound.rol }
            });
        } else {
            res.status(401).json({
                success: false,
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }
    });
});

// Ruta para registrar un nuevo usuario
app.post('/api/registro', (req, res) => {
    const { usuario, password, nombre, rol } = req.body;
    // Validar que se proporcionen usuario y contraseña
    if (!usuario || !password) {
        return res.status(400).json({ success: false, mensaje: 'Usuario y contraseña obligatorios' });
    }
    // Leer el archivo usuarios.json
    const dataPath = path.join(__dirname, 'usuarios.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        let usuarios = [];
        if (!err && data) {
            try {
                usuarios = JSON.parse(data);
            } catch (e) {
                usuarios = [];
            }
        }
        // Verificar si el usuario ya existe
        const existe = usuarios.find((u) => u.usuario === usuario);
        if (existe) {
            return res.status(400).json({ success: false, mensaje: 'El usuario ya está registrado' });
        }
        // Crear el nuevo usuario por defecto rol cliente
        const nuevoUsuario = {
            usuario,
            password,
            nombre: nombre || usuario,
            rol: rol || 'cliente'
        };
        usuarios.push(nuevoUsuario);
        // Guardar en el archivo usuarios.json
        fs.writeFile(dataPath, JSON.stringify(usuarios, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ success: false, mensaje: 'Error al guardar el usuario' });
            }
            res.json({ success: true, mensaje: 'Registro exitoso', usuario: nuevoUsuario });
        });
    });
});


//MIDDLEWARE DE VERIFICACIÓN DE JWT Y RUTA PROTEGIDA

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_temporal';

function verificarTokenJWT(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({
            success: false,
            mensaje: 'Acceso denegado. No se proporcionó un token.'
        });
    }

    const token = authHeader.split(' ')[1]; // Extrae el token del formato "Bearer <token>"

    if (!token) {
        return res.status(403).json({
            success: false,
            mensaje: 'Formato de token inválido.'
        });
    }

    try {
        // Express verifica matemáticamente la firma del token
        const usuarioDecodificado = jwt.verify(token, JWT_SECRET);
        req.user = usuarioDecodificado; // Guardamos la data del usuario en la petición
        next(); // ¡Token válido, puede pasar!
    } catch (error) {
        // 🔴 AQUÍ ES DONDE SE GENERA EL ERROR 401 CUANDO MODIFICAS O CORROMPES EL TOKEN
        return res.status(401).json({
            success: false,
            mensaje: 'Token inválido o expirado.',
            detalle: error.message
        });
    }
}

// Ruta protegida de prueba para demostrar el funcionamiento del JWT
app.get('/api/recurso-protegido', verificarTokenJWT, (req, res) => {
    res.json({
        success: true,
        mensaje: '¡Acceso autorizado! Tienes un JWT válido.',
        usuario: req.user
    });
});
// Ruta protegida usando el middleware que creamos
app.get('/api/cotizacion', verificarTokenJWT, (req, res) => {
    res.json({
        success: true,
        mensaje: '¡Acceso autorizado!',
        usuario: req.user
    });
});
