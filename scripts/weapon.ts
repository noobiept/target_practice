module Weapon
{
export var machineGun = {
        magazine_capacity: 30,
        reload_duration: 2,
        variance: 3,
        recoil: [       // need to be in ascending 'bullet' order
            {
                bullet: 3,
                xOffset: 0,
                yOffset: -15
            },
            {
                bullet: 6,
                xOffset: 0,
                yOffset: -30
            },
            {
                bullet: 9,
                xOffset: 5,
                yOffset: -35
            },
            {
                bullet: 12,
                xOffset: -5,
                yOffset: -40
            },
            {
                bullet: 15,
                xOffset: 0,
                yOffset: -45
            }
        ]
    };
}