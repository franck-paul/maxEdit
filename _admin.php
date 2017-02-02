<?php
# -- BEGIN LICENSE BLOCK ----------------------------------
# This file is part of maxEdit, a plugin for Dotclear 2.
#
# Copyright (c) Franck Paul
# carnet.franck.paul@gmail.com
#
# Licensed under the GPL version 2.0 license.
# A copy of this license is available in LICENSE file or at
# http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
# -- END LICENSE BLOCK ------------------------------------

if (!defined('DC_CONTEXT_ADMIN')) { return; }

// dead but useful code, in order to have translations
__('maxEdit').__('Maximize mode for dcLegacyEditor');

$core->addBehavior('adminPostEditor',array('maxEditBehaviors','adminPostEditor'));

class maxEditBehaviors
{
	public static function adminPostEditor($editor='',$context='',array $tags=array(),$syntax='')
	{
		if ($editor != 'dcLegacyEditor') return;
		if (!in_array($context,['post','page','quickentry'])) return;

		global $core;

		return
		'<script type="text/javascript">'."\n".
		dcPage::jsVar('dotclear.msg.maxEditShow',__('Switch to maximized mode')).
		dcPage::jsVar('dotclear.msg.maxEditHide',__('Exit from maximized mode')).
		dcPage::jsVar('dotclear.maxEditContext',($context == 'page' ? 'post' : $context)).
		"</script>\n".
		dcPage::jsLoad(urldecode(dcPage::getPF('maxEdit/js/post.js')),$core->getVersion('maxEdit'));
	}
}
