from flask import Flask, render_template, url_for, request, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = 'patos'

    # Creamos la conexión con la base de datos:
mysql = MySQL()
app.config['MYSQL_DATABASE_HOST']='localhost'

# Configuración de la conexión a MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'codoacodo'
# Inicializar la extensión MySQL
mysql = MySQL(app)



# RUTAS BASICAS
@app.route('/')
def index():     
    return render_template('home.html')

@app.route('/contacto')
def contacto():     
    return render_template('contacto.html')


@app.route('/crearCuenta')
def crearCuenta():     
    return render_template('crearCuenta.html')

@app.route('/informacion')
def informacion():     
    return render_template('informacion.html')

@app.route('/log')
def log():     
    return render_template('log.html')

@app.route('/recuperarPassword')
def recuperarPassword():     
    return render_template('recuperarPassword.html')

@app.route('/torneos')
def torneos():     
    return render_template('torneos.html')




#MANEJO DE SQL

@app.route('/agregar_al_carrito', methods=['POST'])
def agregar_al_carrito():
    data = request.get_json()
    gameId = data.get('gameId')
    thumbnail = data.get('thumbnail')
    name = data.get('name')    
    val = (gameId, thumbnail, name)
    try:
        conn = mysql.connection
        cursor = conn.cursor()
        # Verificar si existe
        cursor.execute("SELECT * FROM deseados WHERE idJuego = %s", (gameId,))
        juego_existente = cursor.fetchone()

        if juego_existente:
            # Update si ya existe
            cursor.execute("UPDATE deseados SET cantidad = cantidad + 1 WHERE idJuego = %s", (gameId,))
        else:
            # Create si no existe
            cursor.execute("INSERT INTO deseados (idJuego, imagen, nombre, cantidad) VALUES (%s, %s, %s, 1)", val)

        conn.commit()
        return jsonify({"message": "Juego agregado al carrito exitosamente!"}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Error al agregar el juego al carrito."}), 500
    finally:
        cursor.close()

@app.route('/deseados')
def deseados():
    try:
        # READ
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM deseados")
        deseados = cursor.fetchall()

        for deseo in deseados:
            print(deseo)
        return render_template("deseados.html", deseos=deseados)
    except Exception as e:
        print(f"Error: {e}")
        return "Error al obtener los datos de deseados.", 500

@app.route('/actualizarCantidad', methods=['POST'])
def actualizarCantidad():
    data = request.get_json()
    gameId = data.get('gameId')
    change = data.get('change')
    
    try:
        conn = mysql.connection
        cursor = conn.cursor()
        
        # Update
        cursor.execute("UPDATE deseados SET cantidad = cantidad + %s WHERE idJuego = %s", (change, gameId))
        conn.commit()
        
        # Delete
        cursor.execute("DELETE FROM deseados WHERE cantidad < 1")
        conn.commit()

        return jsonify({"success": True}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"success": False}), 500
    finally:
        cursor.close()

@app.route('/deletear', methods=['POST'])
def deletear():
    data = request.get_json()
    gameId = data.get('gameId')
    
    try:
        conn = mysql.connection
        cursor = conn.cursor()
        #Delete
        cursor.execute("DELETE FROM deseados WHERE idJuego = %s", (gameId,))
        conn.commit()

        return jsonify({"success": True}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"success": False}), 500
    finally:
        cursor.close()

if __name__ == '__main__':
    app.run(debug=True)