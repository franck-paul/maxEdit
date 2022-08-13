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
if (!defined('DC_RC_PATH')) {
    return;
}

$this->registerModule(
    'maxEdit',                          // Name
    'Maximize mode for dcLegacyEditor', // Description
    'Franck Paul',                      // Author
    '0.6',
    [
        'type'        => 'plugin',             // Type
        'permissions' => 'usage,contentadmin', // Permissions
        'requires'    => [['core', '2.23']],   // Dependencies
        'settings'    => [],                   // Settings

        'details'    => 'https://open-time.net/?q=maxEdit',       // Details URL
        'support'    => 'https://github.com/franck-paul/maxEdit', // Support URL
        'repository' => 'https://raw.githubusercontent.com/franck-paul/maxEdit/master/dcstore.xml',
    ]
);
