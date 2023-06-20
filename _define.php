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
$this->registerModule(
    'maxEdit',
    'Maximize mode for dcLegacyEditor',
    'Franck Paul',
    '2.2',
    [
        'requires'    => [['core', '2.26']],
        'permissions' => dcCore::app()->auth->makePermissions([
            dcAuth::PERMISSION_USAGE,
            dcAuth::PERMISSION_CONTENT_ADMIN,
        ]),
        'type'     => 'plugin',
        'priority' => 1010, // Must be higher than dcLegacyEditor/dcCKEditor priority (ie 1000)
        'settings' => [],

        'details'    => 'https://open-time.net/?q=maxEdit',
        'support'    => 'https://github.com/franck-paul/maxEdit',
        'repository' => 'https://raw.githubusercontent.com/franck-paul/maxEdit/master/dcstore.xml',
    ]
);
