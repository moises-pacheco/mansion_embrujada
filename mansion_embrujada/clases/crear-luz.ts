import * as three from 'three';



export class Luz{
    constructor(){};


    crearLuces(scene: three.Scene){

        const ambient_ligh = new three.AmbientLight('#6A0DAD', 5);
        ambient_ligh.castShadow = true;


        //Color morado
        const luz_direccional = new three.DirectionalLight(0x6A0DAD,8);
        luz_direccional.position.x = 20;
        luz_direccional.position.y = 5;
        luz_direccional.position.z = 10;
        luz_direccional.castShadow = true;


        const luz_verde = new three.PointLight(0x39FF14,500,200);
        const luz_verde_2 = new three.PointLight(0x39FF14,100,200);
        luz_verde_2.position.set(-1.2,0,7)

        luz_verde_2.castShadow = true;
        luz_verde.castShadow = true;
        luz_verde.position.set(-1.3,.2,1);

        scene.add(luz_direccional, ambient_ligh, luz_verde, luz_verde_2);



        const luz_direccional_helper = new three.DirectionalLightHelper(luz_direccional,5);
        const luz_direccional_verde_helper = new three.PointLightHelper(luz_verde, 1);
        const luz_direccional_verde_helper_2 = new three.PointLightHelper(luz_verde_2, 0.2);
        // scene.add(luz_direccional_helper, luz_direccional_verde_helper, luz_direccional_verde_helper_2);
    }


    crearPostesDeLuz(scene: three.Scene){

        const poste_de_luz = new three.PointLight(0xCCFF00, 200);
        const poste_de_luz_helper = new three.PointLightHelper(poste_de_luz, 1);

        poste_de_luz.position.set(8,1,10)
        scene.add(poste_de_luz);

    }

    
    crearLuzLuciernagas(scene: three.Scene){
        const luciernagas = new three.PointLight(0xCCFF00, 100);
        luciernagas.position.set(-6.8,0,4);
        const luciernagas_helper = new three.PointLightHelper(luciernagas, 1);

        scene.add(luciernagas);
        

    }

}