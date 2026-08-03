<?php

/**
 * @brief maxEdit, a plugin for Dotclear 2
 *
 * @package Dotclear
 * @subpackage Plugins
 *
 * @author Franck Paul and contributors
 *
 * @copyright Franck Paul contact@open-time.net
 * @copyright GPL-2.0 https://www.gnu.org/licenses/gpl-2.0.html
 */
$this->registerModule(
    'maxEdit',
    'Maximize mode for dcLegacyEditor',
    'Franck Paul',
    '7.0',
    [
        'date'        => '2026-08-03T10:04:01+0200',
        'requires'    => [['core', '2.39']],
        'permissions' => 'My',
        'type'        => 'plugin',
        'priority'    => 1010, // Must be higher than dcLegacyEditor/dcCKEditor priority (ie 1000)
        'settings'    => [],

        'details'    => 'https://open-time.net/?q=maxEdit',
        'support'    => 'https://github.com/franck-paul/maxEdit',
        'repository' => 'https://raw.githubusercontent.com/franck-paul/maxEdit/main/dcstore.xml',
        'license'    => 'gpl2',
    ]
);
