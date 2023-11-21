
export default function ennemy(cubes, cube)
    {

        var nbr = Math.random();

        if (nbr >= 0 && nbr < 0.4)
        {
            const cub = {
                x:1200,
                y:cube.y - 50,
                xx: 50,
                yy:50,
            };
            cubes.push(cub);
        }
        else if (nbr >= 0.4 && nbr < 0.6)
        {
            const cub = {
                x:1200,
                y:cube.y - 70,
                xx: 70,
                yy:70,
            };
            cubes.push(cub);
        }
        else if (nbr >= 0.6 && nbr < 0.8)
        {
            const cub = {
                x:1200,
                y:cube.y - 90,
                xx: 90,
                yy:90,
            };
            cubes.push(cub);
        }
        else if (nbr >= 0.8 && nbr < 1)
        {
            const cub = {
                x:1200,
                y:cube.y - 200,
                xx: 90,
                yy:90,
            };
            cubes.push(cub);
        }
    }