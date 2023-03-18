export const swalConfig = {
    icon: 'warning',
    title: 'Oops...',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK'
}

export function changeSwalConfig(icon, title) {
    return { ...swalConfig, icon: icon, title: title }
}