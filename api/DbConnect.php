<?php
	/**
	* Database Connection
	**/
	class DbConnect {
		private $server = '172.24.0.2';
		private $dbname = 'MYSQL_DATABASE';
		private $user = 'MYSQL_USER';
		private $pass = 'MYSQL_PASSWORD';

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
	}
?>
