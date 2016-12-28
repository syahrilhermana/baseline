<?php

namespace Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Settings
 *
 * @Table(name="settings", uniqueConstraints={@UniqueConstraint(name="key", columns={"setting_key"})})
 * @Entity(repositoryClass="Repository\SettingsRepository")
 *
 * This class was generated by the Doctrine ORM.
 * @Author  syahril.hermana@gmail.com
 */
class Settings
{
    /**
     * @var integer
     *
     * @Column(name="id", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @Column(name="setting_key", type="string", length=255, nullable=false)
     */
    private $settingKey;

    /**
     * @var string
     *
     * @Column(name="setting_value", type="string", length=255, nullable=false)
     */
    private $settingValue;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set settingKey
     *
     * @param string $settingKey
     *
     * @return Settings
     */
    public function setSettingKey($settingKey)
    {
        $this->settingKey = $settingKey;

        return $this;
    }

    /**
     * Get settingKey
     *
     * @return string
     */
    public function getSettingKey()
    {
        return $this->settingKey;
    }

    /**
     * Set settingValue
     *
     * @param string $settingValue
     *
     * @return Settings
     */
    public function setSettingValue($settingValue)
    {
        $this->settingValue = $settingValue;

        return $this;
    }

    /**
     * Get settingValue
     *
     * @return string
     */
    public function getSettingValue()
    {
        return $this->settingValue;
    }
}

