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
declare(strict_types=1);

namespace Dotclear\Plugin\maxEdit;

use Dotclear\App;

class BackendBehaviors
{
    public static function adminPostEditor(string $editor = '', string $context = ''): string
    {
        if ($editor !== 'dcLegacyEditor') {
            return '';
        }

        return
        App::backend()->page()->jsJson('maxedit', [
            'show'      => __('Switch to maximized mode'),
            'hide'      => __('Exit from maximized mode'),
            'context'   => $context === 'page' ? 'post' : $context,
            'icon'      => urldecode((string) App::backend()->page()->getPF(My::id() . '/icon.svg')),
            'icon_dark' => urldecode((string) App::backend()->page()->getPF(My::id() . '/icon-dark.svg')),
        ]) .
        My::jsLoad('maxedit.js');
    }
}
