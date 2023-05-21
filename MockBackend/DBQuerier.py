import pyodbc

class DBQuerier:

    host = None
    db = None
    instance = None


    def __init__(self) -> None:
        self.host = 'localhost'
        self.instance = 'SQLEXPRESS01'
        self.db = 'Parkhaus'

    def query_db(self, query):
        connection = self.get_conn()
        cursor = connection.cursor()

        return cursor.execute(query)

    def get_conn(self):
        return pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + self.host + '\\' + self.instance + ';DATABASE=' + self.db + 'Trusted_Connection=yes;')