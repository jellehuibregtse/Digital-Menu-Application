package com.dma.authservice.securtiy;

public enum ApplicationUserPermission {
    MENU_READ("menu:read"),
    MENU_WRITE("menu:write"),
    COLOR_SCHEME_READ("color_scheme:read"),
    COLOR_SCHEME_WRITE("color_scheme:write"),
    LOGO_READ("logo:read"),
    LOGO_WRITE("logo:write");

    private final String permission;

    ApplicationUserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}