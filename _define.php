<?php
/**
 * @brief maxEdit, a plugin for Dotclear 2
 *
 * @package Dotclear
 * @subpackage Plugins
 *
 * @author Franck Paul and contributors
 *
 * @copyright Franck Paul carnet.franck.paul@gmail.com
 * @copyright GPL-2.0 https://www.gnu.org/licenses/gpl-2.0.html
 */

if (!defined('DC_RC_PATH')) {return;}

$this->registerModule(
    "maxEdit",                          // Name
    "Maximize mode for dcLegacyEditor", // Description
    "Franck Paul",                      // Author
    '0.2',                              // Version
    [
        'type'        => 'plugin',             // Type
        'permissions' => 'usage,contentadmin', // Permissions
        'requires'    => [['core', '2.13']],   // Dependencies
        'settings'    => []                   // Settings
    ]
);
