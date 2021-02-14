export interface Zombie {
    id: string
    name: string
    location: string
}

export type ZombieCount = {
    [key: string]: number
}

export interface MenuOption { 
    value: string
    label: string
}