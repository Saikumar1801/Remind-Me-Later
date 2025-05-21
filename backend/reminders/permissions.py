from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True # Allow read for anyone (but get_queryset filters by owner)
                        # For a stricter "only owner can even see", remove this if block.
        return obj.owner == request.user