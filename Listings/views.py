from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')


def services(request):
    return render(request, 'services.html')


def service_details(request):
    return render(request, 'service-details.html')


def properties(request):
    return render(request, 'properties.html')


def property_single(request):
    return render(request, 'property-single.html')


def agents(request):
    return render(request, 'agents.html')


def contact(request):
    return render(request, 'contact.html')


def starter_page(request):
    return render(request, 'starter-page.html')
