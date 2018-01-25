from django.conf.urls import  url

from . import views

urlpatterns = [
    # url(r'^$', views.index, name='index'),
    # url(r'^(?P<filename>.*\.html)$', views.html, name='html'),
    url(r'^commandLine/$', views.commandLine, name='commandLine'),
    # url(r'^test/$', views.test, name='test'),
    # url(r'^start/$', views.start, name='start'),
    # url(r'^showStructure/$', views.showStructure, name='showStructure'),
    url(r'^$', views.landing_page, name='tomainpage'),
    # url(r'^tomainpage/$', views.tomainpage, name='tomainpage'),
    # url(r'^savetodb/$', views.save_to_db, name='savetodb'),
    url(r'^refresh/$', views.refresh_data, name='refresh'),
    url(r'^simulate/$', views.simulate, name='simulate'),
    url(r'^get_model/$', views.get_model, name='get_model'),
    # element
    url(r'^delete_element_from_db/$', views.delete_element_from_db, name='delete_element_from_db'),
    url(r'^add_element_to_db/$', views.add_element_to_db, name='add_element_to_db'),
    url(r'^update_element_to_db/$', views.update_element_to_db, name='update_element_to_db'),
    # data structure
    url(r'^delete_datastructure_from_db/$', views.delete_datastructure_from_db, name='delete_datastructure_from_db'),
    url(r'^add_datastructure_to_db/$', views.add_datastructure_to_db, name='add_datastructure_to_db'),
    #get data structure image
    url(r'^get_image/$', views.get_image, name='get_image'),
    url(r'^data_calc/$', views.tomainpage, name='tomainpage'),



]
