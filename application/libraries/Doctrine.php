<?php

include_once FCPATH . 'vendor/autoload.php';

use Doctrine\Common\ClassLoader;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Setup;
use Doctrine\DBAL\Event\Listeners\MysqlSessionInit;

/**
 * Doctrine bootstrap library for CodeIgniter
 */
class Doctrine
{

	public $em;

	public function __construct()
	{
		// load database configuration from CodeIgniter
		if (! file_exists($dbdriver = APPPATH.'config/'.ENVIRONMENT.'/database.php')
			&& ! file_exists($dbdriver = APPPATH.'config/database.php')) {
			throw new Exception('The configuration file database.php does not exist.');
		}
		require $dbdriver;

		$connection_options = $this->convertDbConfig($db['default']);

		// With this configuration, your model files need to be in application/models/Entity
		$models_namespace = 'Entity';
		$models_path = APPPATH . 'models';
		$proxies_dir = APPPATH . 'models/Proxies';
		$metadata_paths = array(APPPATH . 'models/Entity');

		$dev_mode = true;

		// If you want to use a different metadata driver, change createAnnotationMetadataConfiguration
		// to createXMLMetadataConfiguration or createYAMLMetadataConfiguration.
		$config = Setup::createAnnotationMetadataConfiguration($metadata_paths, $dev_mode, $proxies_dir);
		$this->em = EntityManager::create($connection_options, $config);

		// Force UTF-8
		if($db['default']['dbdriver'] === 'mysqli')
			$this->em->getEventManager()->addEventSubscriber( new MysqlSessionInit('utf8', 'utf8_unicode_ci'));

		// load the entities
		$loader = new ClassLoader($models_namespace, $models_path);
		$loader->register();

		// load the repositories
		$repository = new ClassLoader('Repository', APPPATH.'models');
		$repository->register();
	}

	public function convertDbConfig($db)
	{
		$connectionOptions = [];
		if ($db['dbdriver'] === 'pdo') {
			return $this->convertDbConfigPdo($db);
		} elseif ($db['dbdriver'] === 'mysqli') {
			$connectionOptions = [
				'driver'   => $db['dbdriver'],
				'user'     => $db['username'],
				'password' => $db['password'],
				'host'     => $db['hostname'],
				'dbname'   => $db['database'],
				'charset'  => $db['char_set'],
			];
		} else {
			throw new Exception('Your Database Configuration is not confirmed by CodeIgniter Doctrine');
		}
		return $connectionOptions;
	}
	protected function convertDbConfigPdo($db)
	{
		$connectionOptions = [];
		if (substr($db['hostname'], 0, 7) === 'sqlite:') {
			$connectionOptions = [
				'driver'   => 'pdo_sqlite',
				'user'     => $db['username'],
				'password' => $db['password'],
				'path'     => preg_replace('/\Asqlite:/', '', $db['hostname']),
			];
		} elseif (substr($db['dsn'], 0, 7) === 'sqlite:') {
			$connectionOptions = [
				'driver'   => 'pdo_sqlite',
				'user'     => $db['username'],
				'password' => $db['password'],
				'path'     => preg_replace('/\Asqlite:/', '', $db['dsn']),
			];
		} elseif (substr($db['dsn'], 0, 6) === 'mysql:') {
			$connectionOptions = [
				'driver'   => 'pdo_mysql',
				'user'     => $db['username'],
				'password' => $db['password'],
				'host'     => $db['hostname'],
				'dbname'   => $db['database'],
				'charset'  => $db['char_set'],
			];
		} else {
			throw new Exception('Your Database Configuration is not confirmed by CodeIgniter Doctrine');
		}
		return $connectionOptions;
	}
}
