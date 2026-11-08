from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('services/', views.services, name='services'),
    path('service-details/', views.service_details, name='service_details'),
    path('properties/', views.properties, name='properties'),
    path('property-single/', views.property_single, name='property_single'),
    path('agents/', views.agents, name='agents'),
    path('contact/', views.contact, name='contact'),
    path('starter-page/', views.starter_page, name='starter_page'),
]
