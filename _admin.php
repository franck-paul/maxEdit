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

if (!defined('DC_CONTEXT_ADMIN')) {return;}

// dead but useful code, in order to have translations
__('maxEdit') . __('Maximize mode for dcLegacyEditor');

$core->addBehavior('adminPostEditor', ['maxEditBehaviors', 'adminPostEditor']);

class maxEditBehaviors
{
    public static function adminPostEditor($editor = '', $context = '', array $tags = [], $syntax = '')
    {
        if ($editor != 'dcLegacyEditor') {
            return;
        }

        global $core;

        return
        '<script type="text/javascript">' . "\n" .
        dcPage::jsVar('dotclear.msg.maxEditShow', __('Switch to maximized mode')) .
        dcPage::jsVar('dotclear.msg.maxEditHide', __('Exit from maximized mode')) .
        dcPage::jsVar('dotclear.maxEditContext', ($context == 'page' ? 'post' : $context)) .
        "</script>\n" .
        dcPage::jsLoad(urldecode(dcPage::getPF('maxEdit/js/maxedit.js')), $core->getVersion('maxEdit'));
    }
}
