
export default function ennemy(cubes, ground)
    {

        var nbr = Math.random();

        if (nbr >= 0 && nbr < 0.4)
        {
            const cub = {
                x2:1200,
                x:1200,
                y:ground - 50,
                width: 50,
                height:50,
            };
            cubes.push(cub);
        }
        else if (nbr >= 0.4 && nbr < 0.6)
        {
            const cub = {
                x2:1200,
                x:1200,
                y:ground - 70,
                width: 70,
                height:70,
            };
            cubes.push(cub);
        }
        else if (nbr >= 0.6 && nbr < 0.8)
        {
            const cub = {
                x2:1200,
                x:1200,
                y:ground - 90,
                width: 90,
                height:90,
            };
            cubes.push(cub);
        }
        else if (nbr >= 0.8 && nbr < 1)
        {
            const cub = {
                x2:1200,
                x:1200,
                y:ground - 230,
                width: 90,
                height:90,
            };
            cubes.push(cub);
        }
    }