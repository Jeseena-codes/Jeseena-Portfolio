# Portfolio Django Project
import copy
from django.template.context import BaseContext


# Compatibility fix for Django 4.2.30 on Python 3.14+ (Django Ticket #35844)
# In Python 3.14+, super() became copyable (gh-125767), causing copy(super()) in
# BaseContext.__copy__ to return a 'super' proxy object without a 'dicts' attribute,
# crashing template tags like {% change_list_object_tools %} in admin changelists.
def _basecontext_copy(self):
    duplicate = BaseContext()
    duplicate.__class__ = self.__class__
    duplicate.__dict__ = copy.copy(self.__dict__)
    duplicate.dicts = self.dicts[:]
    return duplicate


BaseContext.__copy__ = _basecontext_copy
