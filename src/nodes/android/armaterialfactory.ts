import { ARMaterial, ARMaterialProperty, ARMaterialWrapMode } from "../../ar-common";
import { Color } from "tns-core-modules/color";
import * as utils from "tns-core-modules/utils/utils";
import { knownFolders, Folder, File, path } from "tns-core-modules/file-system";


export class ARMaterialFactory {



  static applyMaterial(node: com.google.ar.sceneform.Node, material: ARMaterial): Promise<void> {


    if (typeof material === "string") {

      return new Promise<void>((resolve, reject) => { reject("not implemented") });

    } else if (material.constructor.name === "Color") {

      return ARMaterialFactory.applyColor(node, (<Color>material).android)
        .then(() => console.log("Material applied"))
        .catch(err => console.log("Error applying material: " + err));

    } else {

      return ARMaterialFactory.applyARMaterial(node, <ARMaterial>material).catch((err) => {
        console.log(err);
        console.log("Error");
      });
    }



  }


  protected static applyColor(node: com.google.ar.sceneform.Node, color: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {


      com.google.ar.sceneform.rendering.MaterialFactory.makeOpaqueWithColor(
        utils.ad.getApplicationContext(),
        new com.google.ar.sceneform.rendering.Color(color))
        .thenAccept(new (<any>java.util).function.Consumer({
          accept: material => {
            console.log("applyMaterial, material: " + material);
            console.log("applyMaterial, node: " + node);
            const renderable = node.getRenderable();
            console.log("applyMaterial, renderable: " + renderable);
            if (renderable) {
              renderable.setMaterial(material);
            }
            resolve();
          }
        }))
        .exceptionally(new (<any>java.util).function.Function({
          apply: error => reject(error)
        }));
    });
  }


  protected static applyARMaterial(node: com.google.ar.sceneform.Node, material: ARMaterial): Promise<void> {
    return new Promise<void>((resolve, reject) => {

     android.os.AsyncTask.execute(new java.lang.Runnable({
  
       run:()=>{
          //TODO your background code
       

          let gltf = blankGLTF();
          let index = 0;

          if (material.diffuse) {
            if (material.diffuse.constructor.name === "Color") {


             
              addPbrMetallic(gltf, {
                "baseColorFactor": colorFrom(<Color>material.diffuse),
              });

            } else {
              addTexture(gltf, material.diffuse, index);
              addPbrMetallic(gltf, {
                "baseColorTexture": {
                  "index": index
                }
              });
              gltf.materials[0]["extensions"] = {
                "KHR_materials_pbrSpecularGlossiness": {
                  "diffuseTexture": {
                    "index": index
                  }
                }
              };
              index++;
            }
          }

          if (material.normal) {
            if (material.normal.constructor.name === "Color") {

            } else {
              addTexture(gltf, material.normal, index);
              gltf.materials[0]["normalTexture"] = {
                "index": index
              };
              index++;
            }
          }

          if (material.roughness) {
            if (material.roughness.constructor.name === "Color") {

            } else {
              addTexture(gltf, material.roughness, index);
              addPbrMetallic(gltf, {
                "metallicRoughnessTexture": {
                  "index": index
                }
              });
              index++;
            }
          }


          var p = path.join(knownFolders.temp().path, "ar-" + (new Date()).getTime());


          const tmp = Folder.fromPath(p)
          const file = tmp.getFile("model_source.gltf");
          const modelPath = file.path;



          let promise = file.writeText(JSON.stringify(gltf, null, "   "))
            .then(() => {
              return copyAsset("material.bin", tmp.getFile("material.bin").path);
            });


          gltf.images.forEach(image => {
            promise = promise.then(() => {
              return copyAsset(image.uri, tmp.getFile(image.uri).path).then(() => console.log("copy success: " + image.uri))
            });
          });


          promise.then(() => {


            let context = utils.ad.getApplicationContext();
            let model = com.google.ar.sceneform.assets.RenderableSource.builder().setSource(
              context, android.net.Uri.parse(modelPath), com.google.ar.sceneform.assets.RenderableSource.SourceType.GLTF2
            ).build();

            com.google.ar.sceneform.rendering.ModelRenderable.builder()
              .setSource(context, model) // eg. "andy.sfb"
              .build()
              .thenAccept(new (<any>java.util).function.Consumer({
                accept: renderable => {

                  node.getRenderable().setMaterial(renderable.getMaterial());

                }
              }))
              .exceptionally(new (<any>java.util).function.Function({
                apply: error => {
                  console.log(error);
                  console.error("failed loading: custom material");
                  reject(error);
                }
              }));

          }).catch((err) => {
            console.error("failed to load custom material");
            console.log(err);
            reject(err);
          });



      }
    }));


    });
  }

}


const getWrapMode = (wrapMode: ARMaterialWrapMode): number => {
  if (wrapMode === "Mirror") {
    return 33648;
  } else if (wrapMode === "Clamp") {
    return 33071;
  } else if (wrapMode === "ClampToBorder") {
    return 33071;
  } else {
    return 10497;
  }
}

let counter = 0;
const copyAsset = (asset: string, to: string): Promise<void> => {


  return new Promise(function(resolve, reject) {

    const context = utils.ad.getApplicationContext();
    //const uri=android.net.Uri.parse(asset)
    let input = context.getAssets().open(asset);
    let out = new java.io.FileOutputStream(new java.io.File(to));

    // Transfer bytes from in to out
    let buf = Array.create("byte", 1024);
    let len;
    while ((len = input.read(buf)) > 0) {
      out.write(buf, 0, len);
    }
    input.close();
    out.close();
    resolve()

  });

}

const colorFrom=(color:Color):Array<number> => {

   const c= new com.google.ar.sceneform.rendering.Color(color.android)
   return [c.r, c.g, c.b, c.a];
}

const addPbrMetallic = (gltf, property) => {
  if (typeof gltf.materials[0]["pbrMetallicRoughness"] == "undefined") {
    gltf.materials[0]["pbrMetallicRoughness"] = {};
  }

  Object.keys(property).forEach(key => gltf.materials[0]["pbrMetallicRoughness"][key] = property[key]);
}


const addTexture = (gltf, material, index) => {


  let property = <ARMaterialProperty>(typeof material == "string" ? {
    contents: material,
    wrapMode: "Repeat"
  } : material);

  gltf.images.push({
    "uri": property.contents
  })

  gltf.samplers.push({
    "magFilter": 9729,
    "minFilter": 9987,
    "wrapT": getWrapMode(property.wrapMode),
    "wrapS": getWrapMode(property.wrapMode)
  });


  gltf.textures.push({
    "sampler": index,
    "source": index
  });
}


const blankGLTF = () => {


  return {
    "asset": {
      "version": "2.0",
      "generator": "Khronos glTF Blender I/O v0.9.53"
    },
    "scene": 0,
    "scenes": [
      {
        "nodes": [
          0
        ],
        "name": "Scene"
      }
    ],
    "nodes": [
      {
        "mesh": 0,
        "name": "Cube"
      }
    ],
    "images": [

    ],
    "materials": [
      {
        "name": "Material",
        "alphaMode":"BLEND"
      }
    ],
    "samplers": [

    ],
    "textures": [

    ],
    "meshes": [
      {
        "primitives": [
          {
            "attributes": {
              "POSITION": 0,
              "NORMAL": 1,
              "TEXCOORD_0": 2
            },
            "material": 0,
            "indices": 3
          }
        ],
        "name": "Cube"
      }
    ],
    "accessors": [
      {
        "componentType": 5126,
        "count": 24,
        "type": "VEC3",
        "min": [
          -1.0000003576278687,
          -1,
          -1.0000003576278687
        ],
        "bufferView": 0,
        "max": [
          1.0000004768371582,
          1,
          1.0000005960464478
        ]
      },
      {
        "componentType": 5126,
        "bufferView": 1,
        "count": 24,
        "type": "VEC3"
      },
      {
        "componentType": 5126,
        "bufferView": 2,
        "count": 24,
        "type": "VEC2"
      },
      {
        "componentType": 5123,
        "bufferView": 3,
        "count": 36,
        "type": "SCALAR"
      }
    ],
    "bufferViews": [
      {
        "byteLength": 288,
        "buffer": 0,
        "byteOffset": 0
      },
      {
        "byteLength": 288,
        "buffer": 0,
        "byteOffset": 288
      },
      {
        "byteLength": 192,
        "buffer": 0,
        "byteOffset": 576
      },
      {
        "byteLength": 72,
        "buffer": 0,
        "byteOffset": 768
      }
    ],
    "buffers": [
      {
        "byteLength": 840,
        "uri": "material.bin"
      }
    ]
  };


}

