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

use Dotclear\Core\Backend\Page;

class BackendBehaviors
{
    public static function adminPostEditor($editor = '', $context = '')
    {
        if ($editor !== 'dcLegacyEditor') {
            return;
        }

        return
        Page::jsJson('maxedit', [
            'show'     => __('Switch to maximized mode'),
            'hide'     => __('Exit from maximized mode'),
            'context'  => $context == 'page' ? 'post' : $context,
            'icon_on'  => urldecode(Page::getPF(My::id() . '/img/max-on.svg')),
            'icon_off' => urldecode(Page::getPF(My::id() . '/img/max-off.svg')),
        ]) .
        My::jsLoad('maxedit.js');
    }
}
