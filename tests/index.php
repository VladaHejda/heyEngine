<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        * {margin: 0; padding: 0;}
        body {float: left; width: 100%; height: 300px; background: url('img/a.jpg');}
        .unitSelected {border: #900 1px solid;}
        .dragnDrop, .unit {position: absolute;}
        .dragnDrop {position: absolute; cursor: pointer;}
        .dragnDrop.dragged {cursor: none;}

    </style>
    <script type="text/javascript" src="../vendor/components/jquery/jquery.js"></script>
    <script type="text/javascript" src="../js/heyEngine-0.1.js"></script>
    <script type="text/javascript">
        hey.dragnDropInit();
        hey.unitInit({
            gridX: 50,
            gridY: 50
        });
    </script>
</head>
<body>
    <img src="img/b.jpg" class="dragnDrop" style="top: 180px; left: 700px;" />
    <img src="img/c.jpg" style="top: 80px;" class="unit" />
    <div class="dragnDrop" style="left: 100px; top: 120px;">ahoj</div>
    <div style="position: absolute; left: 570px; top: 200px; width: 150px; height: 80px; border: yellow 1px solid;">&nbsp;</div>
    <a href="http://www.seznam.cz"style="position:absolute;left: 700px; top: 120px;">bléé</a>
</body>
</html>
