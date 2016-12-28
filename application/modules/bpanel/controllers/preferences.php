<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

use Doctrine\ORM\Mapping\Driver\DatabaseDriver;
use Doctrine\ORM\Tools\DisconnectedClassMetadataFactory;
use Doctrine\ORM\Tools\EntityGenerator;
use Doctrine\ORM\Tools\EntityRepositoryGenerator;
/**
 * @package	preferences
 * @author	Syahril Hermana
 */

class preferences extends CI_Controller {
    protected $em;

    public function __construct() {
        parent::__construct();

        // load doctrine entity manager
        $this->em = $this->doctrine->em;
    }

    public function index(){
        // save data
        $setting = new Entity\Settings();
        $setting->setSettingKey("version");
        $setting->setSettingValue("0.0.1");

        try{
            $this->em->persist($setting);
            $this->em->flush();
        } catch (Exception $e){
//            echo "gagal simpan";
        }

        // delete data by criteria
        $setting = $this->em->getRepository('Entity\Settings')->getPreferencesByKey('orm');

        if($setting){
            $this->em->remove($setting);
            $this->em->flush();
        } else {
//            echo "gagal hapus";
        }


        // list data
        $data = $this->em->getRepository('Entity\Settings')->getPreferences(0, 25);

        foreach($data as $item){
            echo $item->getSettingKey()." => ".$item->getSettingValue()."<br/>";
        }
    }

    /**
     * generate entity objects automatically from mysql db tables
     * @return none
     */
    function generate_classes(){

        $this->em->getConfiguration()
            ->setMetadataDriverImpl(
                new DatabaseDriver(
                    $this->em->getConnection()->getSchemaManager()
                )
            );

        $cmf = new DisconnectedClassMetadataFactory();
        $cmf->setEntityManager($this->em);
        $metadata = $cmf->getAllMetadata();

        // Entity & Repository Generator
        $generator = new EntityGenerator();
        $generator->setUpdateEntityIfExists(true);
        $generator->setGenerateStubMethods(true);
        $generator->setGenerateAnnotations(true);
        $generator->generate($metadata, APPPATH."models/Entity");

    }
}

