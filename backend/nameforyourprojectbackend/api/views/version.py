from django.http import JsonResponse

def get_info(req):
    return JsonResponse({"version": "1.0"})
