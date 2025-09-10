# Translation Plan

## Todos

-   [x] Translate `index.html`
-   [x] Translate `src/main.jsx`
-   [x] Translate `src/ui.jsx`
-   [x] Translate `src/ann.jsx`
-   [x] Translate `src/knn.jsx`
-   [x] Translate `src/perceptron.jsx`
-   [x] Translate `src/svm.jsx`
-   [x] Translate `src/tree.jsx`

## Translations

### `index.html`

-   "Machine Learning Playground" -> "Spielplatz für maschinelles Lernen"
-   "Fork me on GitHub" -> "Fork me on GitHub"
-   "Feedback" -> "Feedback"

### `src/main.jsx`

-   "Populate the Canvas" -> "Fülle die Leinwand"
-   "Click to add data points" -> "Klicke, um Datenpunkte hinzuzufügen"
-   "Select Data type" -> "Wähle den Datentyp"
-   "You get two colors, or classes, to chose from. Select x to begin Eraser Mode." -> "Du kannst aus zwei Farben oder Klassen wählen. Wähle x, um den Radiergummi-Modus zu starten."
-   "Select Model" -> "Wähle das Modell"
-   "Swap between different models. Try them all out! Your data and predictions don't change until you retrain." -> "Wechsle zwischen verschiedenen Modellen. Probiere sie alle aus! Deine Daten und Vorhersagen ändern sich nicht, bis du neu trainierst."
-   "Tune parameters" -> "Parameter anpassen"
-   "You can change some settings of each model." -> "Du kannst einige Einstellungen für jedes Modell ändern."
-   "Train and fire!" -> "Trainieren und los!"
-   "Click to train your model! Note that some models can take time to train (sometimes up to 10-20 seconds). If the button remains black, chances are it's still training." -> "Klicke, um dein Modell zu trainieren! Beachte, dass das Training einiger Modelle einige Zeit in Anspruch nehmen kann (manchmal bis zu 10-20 Sekunden). Wenn die Schaltfläche schwarz bleibt, wird wahrscheinlich noch trainiert."
-   "Read and learn" -> "Lesen und lernen"
-   "Contains details about how the algorithm is run. Try and follow the guides to test effectiveness of certain models on certain datasets." -> "Enthält Details zur Ausführung des Algorithmus. Versuche, den Anleitungen zu folgen, um die Wirksamkeit bestimmter Modelle für bestimmte Datensätze zu testen."
-   "That's all!" -> "Das ist alles!"
-   "Have fun! Leave some feedback if you thought this was cool." -> "Viel Spaß! Hinterlasse ein Feedback, wenn du das cool fandest."

### `src/ui.jsx`

-   "Upload Data" -> "Daten hochladen"
-   "Save Data" -> "Daten speichern"
-   "Clear all" -> "Alles löschen"
-   "K Nearest Neighbors" -> "K Nächste Nachbarn"
-   "Perceptron" -> "Perzeptron"
-   "Support Vector Machine" -> "Support-Vektor-Maschine"
-   "Artificial Neural Network" -> "Künstliches neuronales Netz"
-   "Decision Tree" -> "Entscheidungsbaum"
-   "Parameters:" -> "Parameter:"
-   "Train" -> "Trainieren"

### `src/ann.jsx`

-   "Learning rate:" -> "Lernrate:"
-   "Max Epochs:" -> "Max. Epochen:"
-   "Max error %:" -> "Max. Fehler %:"
-   "Click on neurons to remove" -> "Klicke auf Neuronen, um sie zu entfernen"
-   "Add Layers" -> "Schichten hinzufügen"
-   "Artificial Neural Network" -> "Künstliches neuronales Netz"
-   "Perceptrons! More Perceptrons!" -> "Perzeptrone! Mehr Perzeptrone!"
-   "Chain a lot of perceptrons together, in layers. Forward-propogate to solve for a prediction. Train by using backpropogation and updating weights of the neurons." -> "Verkette viele Perzeptrone in Schichten. Führe eine Vorwärtspropagierung durch, um eine Vorhersage zu treffen. Trainiere durch Backpropagation und Aktualisierung der Gewichte der Neuronen."
-   "Training rate: how fast the network learns from mistakes. Decrease if the network is coming up with poor results." -> "Trainingsrate: Wie schnell das Netzwerk aus Fehlern lernt. Verringern, wenn das Netzwerk schlechte Ergebnisse liefert."
-   "Max Epochs: Rounds of training to go through. Increase if results are poor." -> "Max. Epochen: Anzahl der Trainingsrunden. Erhöhen, wenn die Ergebnisse schlecht sind."
-   "Max Error: percentage error to reach before we stop trying." -> "Max. Fehler: prozentualer Fehler, der erreicht werden soll, bevor wir aufhören zu trainieren."
-   "Layers and neurons - just keep it reasonable! Don't train a 1000 layers each with 1000 neurons - you'll shoot your eye out." -> "Schichten und Neuronen - halte es in einem vernünftigen Rahmen! Trainiere keine 1000 Schichten mit jeweils 1000 Neuronen - du wirst dir noch ein Auge ausschießen."
-   "Binary Classification" -> "Binäre Klassifizierung"
-   "Multi-class Classification" -> "Mehrklassenklassifizierung"
-   "Regression" -> "Regression"
-   "The hottest thing out there (note: written in 2017). Who knows how long this trend will go on for." -> "Das Heißeste, was es gibt (Anmerkung: geschrieben 2017). Wer weiß, wie lange dieser Trend anhalten wird."
-   "The basic premise is that you have multiple layers of perceptrons. Each layer takes in input from the last, and each neuron outputs one number - ie. 'fires'. We then apply some activation function to this 'fired' output, and then we move onto the next layer." -> "Die Grundvoraussetzung ist, dass man mehrere Schichten von Perzeptronen hat. Jede Schicht erhält eine Eingabe von der letzten, und jedes Neuron gibt eine Zahl aus - d.h. es 'feuert'. Wir wenden dann eine Aktivierungsfunktion auf diese 'gefeuerte' Ausgabe an, und dann gehen wir zur nächsten Schicht über."
-   "The activation function is crucial in this - if you didn't push outputs through an activation function, you're effectively training a simple perceptron. In other words, activation functions are what gives Neural Networks their magic. In this case, we use a tanh activation function that scales outputs between -1 to 1 - a variety of others are used, such as Rectified Linear Units (ReLU) and the logistic function." -> "Die Aktivierungsfunktion ist hier entscheidend - wenn man die Ausgaben nicht durch eine Aktivierungsfunktion schickt, trainiert man effektiv ein einfaches Perzeptron. Mit anderen Worten, Aktivierungsfunktionen sind das, was neuronalen Netzen ihre Magie verleiht. In diesem Fall verwenden wir eine tanh-Aktivierungsfunktion, die die Ausgaben zwischen -1 und 1 skaliert - eine Vielzahl anderer wird verwendet, wie z. B. Rectified Linear Units (ReLU) und die logistische Funktion."
-   "Another key component is the backpropogation algorithm. Because of the network's straightforward structure, we can mathematically find a way to optimize our network. We calculate a 'gradient', which involves calculating derivatives for each individual neuron, and then adjusting all the weights accordingly. We adjust the weights by going back from the last layer to the first - hence 'Backpropagation' of weight updates." -> "Eine weitere Schlüsselkomponente ist der Backpropagation-Algorithmus. Aufgrund der unkomplizierten Struktur des Netzwerks können wir mathematisch einen Weg finden, unser Netzwerk zu optimieren. Wir berechnen einen 'Gradienten', was die Berechnung von Ableitungen für jedes einzelne Neuron beinhaltet, und passen dann alle Gewichte entsprechend an. Wir passen die Gewichte an, indem wir von der letzten Schicht zur ersten zurückgehen - daher 'Backpropagation' der Gewichtsaktualisierungen."
-   "A lot of cooler applications of Neural Networks revolve around using more complex forms than a simple Dense network (as presented here)." -> "Viele coolere Anwendungen von neuronalen Netzen drehen sich um die Verwendung komplexerer Formen als ein einfaches dichtes Netzwerk (wie hier vorgestellt)."
-   "Convolutional Networks (ConvNets) are experts at image processing, as they 'Convolve' across the whole image, ie. scan the image with a smaller moving window." -> "Convolutional Networks (ConvNets) sind Experten für die Bildverarbeitung, da sie über das gesamte Bild 'falten', d.h. das Bild mit einem kleineren beweglichen Fenster abtasten."
-   "Recurrent Neural Networks (RNNs) are powerful for data generation, both for images and text, because of their power to 'remember' data from previous entries in a time series." -> "Recurrent Neural Networks (RNNs) sind leistungsstark für die Datengenerierung, sowohl für Bilder als auch für Text, da sie die Fähigkeit haben, sich an Daten aus früheren Einträgen in einer Zeitreihe zu 'erinnern'."
-   "Universal Approximator - any continuous function can be approximated by a finite amount of neurons in one layer. No guarantees about learnability though - ie. there's a good fit out there, but it's kinda on you to find it. Somehow." -> "Universeller Approximator - jede kontinuierliche Funktion kann durch eine endliche Anzahl von Neuronen in einer Schicht angenähert werden. Keine Garantie für die Lernfähigkeit - d.h. es gibt eine gute Lösung, aber es liegt an Ihnen, sie zu finden. Irgendwie."
-   "As stated, very effective at certain problems such as visual or linguistic problems." -> "Wie bereits erwähnt, sehr effektiv bei bestimmten Problemen wie visuellen oder sprachlichen Problemen."
-   "Bulky - training can take a bit of time, and the number of layers people are training these days are sort of ridiculous" -> "Sperrig - das Training kann eine Weile dauern, und die Anzahl der Schichten, die heutzutage trainiert werden, ist irgendwie lächerlich"
-   "Mysterious - in some ways, we're not entirely sure why they're so effective. Kind of like black boxes almost. Easy to visualize if you're working with image data, but on higher dimensions it takes some creativity to understand the neurons and weights." -> "Geheimnisvoll - in gewisser Weise sind wir uns nicht ganz sicher, warum sie so effektiv sind. Fast wie Black Boxes. Leicht zu visualisieren, wenn man mit Bilddaten arbeitet, aber in höheren Dimensionen braucht es etwas Kreativität, um die Neuronen und Gewichte zu verstehen."
-   "Wikipedia: Artificial neural network" -> "Wikipedia: Künstliches neuronales Netz"
-   "Intuitions on backpropogation (Stanford CS 231n, Karpathy)" -> "Intuitionen zur Backpropagation (Stanford CS 231n, Karpathy)"
-   "Intuitive explanation of ConvNets (Karn)" -> "Intuitive Erklärung von ConvNets (Karn)"
-   "The Unreasonable Effectiveness of Recurrent Neural Networks (Karpathy)" -> "Die unzumutbare Wirksamkeit von rekurrenten neuronalen Netzen (Karpathy)"

### `src/knn.jsx`

-   "K:" -> "K:"
-   "K Nearest Neighbors" -> "K Nächste Nachbarn"
-   "Birds of a feather flock together" -> "Gleich und gleich gesellt sich gern"
-   "Picks the k closest points from training data, then decides prediction via popular vote." -> "Wählt die k nächstgelegenen Punkte aus den Trainingsdaten aus und entscheidet dann die Vorhersage per Mehrheitsentscheid."
-   "k (≥ 1): number of closest neighbors to select" -> "k (≥ 1): Anzahl der zu wählenden nächsten Nachbarn"
-   "A simple and straightforward algorithm. The underlying assumption is that datapoints close to each other share the same label." -> "Ein einfacher und unkomplizierter Algorithmus. Die zugrunde liegende Annahme ist, dass Datenpunkte, die nahe beieinander liegen, dieselbe Bezeichnung haben."
-   "Analogy: if I hang out with CS majors, then I'm probably also a CS major (or that one Philosophy major who's minoring in everything.)" -> "Analogie: Wenn ich mit Informatik-Studenten abhänge, bin ich wahrscheinlich auch ein Informatik-Student (oder der eine Philosophie-Student, der alles im Nebenfach belegt)."
-   "Note that distance can be defined different ways, such as Manhattan (sum of all features, or inputs), Euclidean (geometric distance), p-norm distance...typically Euclidean is used (like in this demo), but Manhattan can be faster and thus preferable." -> "Beachten Sie, dass die Entfernung auf unterschiedliche Weise definiert werden kann, z. B. Manhattan (Summe aller Merkmale oder Eingaben), Euklidisch (geometrische Entfernung), p-Norm-Entfernung ... typischerweise wird Euklidisch verwendet (wie in dieser Demo), aber Manhattan kann schneller und daher vorzuziehen sein."
-   "Simple to implement" -> "Einfach zu implementieren"
-   "Non-Parametric - size of model grows as training data grows. It could take a long time to compute distances for billions of datapoints." -> "Nicht-parametrisch - die Größe des Modells wächst mit den Trainingsdaten. Es kann lange dauern, die Entfernungen für Milliarden von Datenpunkten zu berechnen."
-   "Curse of Dimensionality - as number of features increase (ie. more dimensions), the average distance between randomly distributed points converge to a fixed value. This means that most points end up equidistant to each other - so distance becomes less meaningful as a metric" -> "Fluch der Dimensionalität - wenn die Anzahl der Merkmale zunimmt (d. h. mehr Dimensionen), konvergiert der durchschnittliche Abstand zwischen zufällig verteilten Punkten gegen einen festen Wert. Dies bedeutet, dass die meisten Punkte am Ende den gleichen Abstand voneinander haben - so wird die Entfernung als Metrik weniger aussagekräftig."
-   "Wikipedia: k-nearest neighbors algorithm" -> "Wikipedia: k-Nächste-Nachbarn-Algorithmus"
-   "SKlearn KNN classifier package" -> "SKlearn KNN-Klassifikator-Paket"
-   "SKlearn KNN regressor package" -> "SKlearn KNN-Regressor-Paket"
-   "KNN math notes (Cornell CS 4780, Weinberger)" -> "KNN-Mathe-Notizen (Cornell CS 4780, Weinberger)"

### `src/perceptron.jsx`

-   "Max Iters:" -> "Max. Iterationen:"
-   "Perceptron" -> "Perzeptron"
-   "Drawing a line in the sand" -> "Eine Linie in den Sand zeichnen"
-   "Comes up with a flat space that cleanly separates the data." -> "Erzeugt einen flachen Raum, der die Daten sauber trennt."
-   "Max Iters (≤ 100): Maximum number of updates for training" -> "Max. Iterationen (≤ 100): Maximale Anzahl von Aktualisierungen für das Training"
-   "One of the oldest algorithms out there - cause it's a very simple one. In mathematical terms, we simply solve for a linear combination of the inputs (ie. h = ax + by + cz..., where x, y, z are inputs and a, b, c are constants), then use this output h to predict - positive h for Class A , negative h for Class B. In an intuitive sense, we're finding a straight boundary that exactly cuts through the data." -> "Einer der ältesten Algorithmen überhaupt - denn er ist sehr einfach. Mathematisch ausgedrückt, lösen wir einfach eine lineare Kombination der Eingaben (d.h. h = ax + by + cz..., wobei x, y, z Eingaben und a, b, c Konstanten sind), und verwenden dann diese Ausgabe h zur Vorhersage - positives h für Klasse A, negatives h für Klasse B. Intuitiv ausgedrückt, finden wir eine gerade Grenze, die die Daten exakt durchschneidet."
-   "It's easy to visualize it as a line if the data is two-dimensional - as in our case. In three dimensions, it's a plane. In four dimensions, it's an entire 3d space - not so easy to visualize anymore." -> "Es ist leicht, es als Linie zu visualisieren, wenn die Daten zweidimensional sind - wie in unserem Fall. In drei Dimensionen ist es eine Ebene. In vier Dimensionen ist es ein ganzer 3D-Raum - nicht mehr so einfach zu visualisieren."
-   "The history behind the perceptron is quite an interesting one. Soon after its invention by Rosenblatt at Cornell in 1957, it was hyped up to be the \"next big thing\" - the New York Times, for example, reported that the perceptron \"will be able to walk, talk, see, write, reproduce itself and be conscious of its existence.\"" -> "Die Geschichte hinter dem Perzeptron ist ziemlich interessant. Bald nach seiner Erfindung durch Rosenblatt an der Cornell University im Jahr 1957 wurde es als das \"nächste große Ding\" hochgespielt - die New York Times berichtete zum Beispiel, dass das Perzeptron \"laufen, sprechen, sehen, schreiben, sich selbst reproduzieren und sich seiner Existenz bewusst sein können wird.\""
-   "However, it became rather clear that it could achieve non of these feats - it couldn't even recognize a circle, for example (try it!). This led to an abrupt end in perceptron research in 1969 - what we now call one of several \"AI winters\". Perhaps this serves as a cautionary tale for our own golden age of Machine Learning..." -> "Es wurde jedoch ziemlich schnell klar, dass es keine dieser Leistungen vollbringen konnte - es konnte nicht einmal einen Kreis erkennen, zum Beispiel (probieren Sie es aus!). Dies führte 1969 zu einem abrupten Ende der Perzeptron-Forschung - was wir heute als einen von mehreren \"KI-Wintern\" bezeichnen. Vielleicht dient dies als warnendes Beispiel für unser eigenes goldenes Zeitalter des maschinellen Lernens..."
-   "Simple to implement" -> "Einfach zu implementieren"
-   "Tiny, tiny model (boils down to small list of numbers!)" -> "Winziges, winziges Modell (läuft auf eine kleine Liste von Zahlen hinaus!)"
-   "Assumes linearly separable data - does poorly otherwise" -> "Setzt linear trennbare Daten voraus - schneidet sonst schlecht ab"
-   "Can end up with bad fits with points right on the 'edge'" -> "Kann zu schlechten Anpassungen führen, wenn Punkte direkt am 'Rand' liegen"
-   "Wikipedia: Perceptron" -> "Wikipedia: Perzeptron"
-   "SKlearn perceptron package" -> "SKlearn Perzeptron-Paket"
-   "Perceptron math notes (Cornell CS 4780, Weinberger)" -> "Perzeptron-Mathe-Notizen (Cornell CS 4780, Weinberger)"

### `src/svm.jsx`

-   "C:" -> "C:"
-   "RBF Kernel?:" -> "RBF-Kernel?:"
-   "Support Vector Machine" -> "Support-Vektor-Maschine"
-   "Personal space, please" -> "Bitte Abstand halten"
-   "Picks a hyperplane separating the data, but maximizes margin. (Credits: Andrej Karpathy's svm Node package)" -> "Wählt eine Hyperebene, die die Daten trennt, aber den Rand maximiert. (Credits: Andrej Karpathys svm Node-Paket)"
-   "C (≥ 0): Regularization constant. How hard the SVM will try to fit all your data at risk of overfitting with overly complex model" -> "C (≥ 0): Regularisierungskonstante. Wie sehr die SVM versuchen wird, alle Ihre Daten anzupassen, auf die Gefahr hin, mit einem übermäßig komplexen Modell zu überanpassen"
-   "RBF Kernel: Default is unselected - uses Linear SVM. Toggle to use RBF Kernel SVM" -> "RBF-Kernel: Standard ist nicht ausgewählt - verwendet lineare SVM. Umschalten, um RBF-Kernel-SVM zu verwenden"
-   "Basically a perceptron on steroids. By \"margin\", we mean \"the distance between plane and point closest to plane\". So by maximizing the margin, we are making sure that all points are as far away from the decision boundary as they can be." -> "Im Grunde ein Perzeptron auf Steroiden. Mit \"Rand\" meinen wir \"den Abstand zwischen der Ebene und dem Punkt, der der Ebene am nächsten liegt\". Indem wir den Rand maximieren, stellen wir also sicher, dass alle Punkte so weit wie möglich von der Entscheidungsgrenze entfernt sind."
-   "Originally, we start with a linear SVM - meaning that our dividing hyperplane, much like the perceptron, \"operates\" with straight lines as boundaries. Obviously this is a bit limiting - we still can't recognize circles! Not all is lost, however - we can introduce some helpful changes." -> "Ursprünglich beginnen wir mit einer linearen SVM - das bedeutet, dass unsere trennende Hyperebene, ähnlich wie das Perzeptron, mit geraden Linien als Grenzen \"operiert\". Offensichtlich ist dies etwas einschränkend - wir können immer noch keine Kreise erkennen! Es ist jedoch nicht alles verloren - wir können einige hilfreiche Änderungen einführen."
-   "The Kernel Trick (makes it sound almost like magic...) is when we go from a Primal SVM formation to a Dual formation. Complicated math aside, this effectively means that you're 'multiplying' a test vector by select Support Vectors, then combining the products to form a good prediction. (Refer to resources for complex definition)" -> "Der Kernel-Trick (lässt es fast wie Magie klingen...) ist, wenn wir von einer primalen SVM-Formulierung zu einer dualen Formulierung übergehen. Abgesehen von komplizierter Mathematik bedeutet dies effektiv, dass Sie einen Testvektor mit ausgewählten Stützvektoren \'multiplizieren\' und dann die Produkte kombinieren, um eine gute Vorhersage zu treffen. (Siehe Ressourcen für eine komplexe Definition)"
-   "With a Linear SVM, we are essentially using a Dot Product as the 'Multiplication' for the Dual. We could replace this with other forms of 'multiplication' methods, which are called Kernels. A very popular choice is the RBF kernel - the 'multiplications' end up relying on net distance between test points, so in effect it's actually sort of like KNN, but much more regularized." -> "Bei einer linearen SVM verwenden wir im Wesentlichen ein Skalarprodukt als \'Multiplikation\' für das Dual. Wir könnten dies durch andere Formen von \'Multiplikations\'-Methoden ersetzen, die als Kernel bezeichnet werden. Eine sehr beliebte Wahl ist der RBF-Kernel - die \'Multiplikationen\' hängen letztendlich vom Nettoabstand zwischen den Testpunkten ab, so dass es im Grunde genommen so etwas wie KNN ist, aber viel stärker regularisiert."
-   "Option to regularize - ie. reduce overfitting by preferring 'simpler' models over complex ones. Try tweaking C to see its effects!" -> "Option zur Regularisierung - d.h. Reduzierung der Überanpassung durch Bevorzugung \'einfacherer\' Modelle gegenüber komplexen. Versuchen Sie, C zu optimieren, um die Auswirkungen zu sehen!"
-   "Parametric (Linear SVM): model remains same size regardless of dataset size" -> "Parametrisch (Lineare SVM): Das Modell bleibt unabhängig von der Größe des Datensatzes gleich groß"
-   "Non-parametric (RBF Kernel SVM): model itself may get more complicated as data set grows" -> "Nicht-parametrisch (RBF-Kernel-SVM): Das Modell selbst kann mit wachsendem Datensatz komplizierter werden"
-   "Wikipedia: Support vector machine" -> "Wikipedia: Support-Vektor-Maschine"
-   "SKlearn Support Vector Machines overview" -> "SKlearn Support Vector Machines Übersicht"
-   "SVM math notes (Cornell CS 4780, Weinberger)" -> "SVM-Mathe-Notizen (Cornell CS 4780, Weinberger)"
-   "Math behind simplified SMO SVM algorithm used in the Karpathy package" -> "Mathematik hinter dem vereinfachten SMO-SVM-Algorithmus, der im Karpathy-Paket verwendet wird"

### `src/tree.jsx`

-   "Max Tree Depth:" -> "Max. Baumtiefe:"
-   "Decision Tree" -> "Entscheidungsbaum"
-   "If computers played 21 questions" -> "Wenn Computer 21 Fragen spielen würden"
-   "Design a tree that tries to put data into buckets, using certain thresholds on features (ie inputs)" -> "Entwerfen Sie einen Baum, der versucht, Daten in Eimer zu legen, unter Verwendung bestimmter Schwellenwerte für Merkmale (d. H. Eingaben)."
-   "Max depth (≤ 100): Maximum number of splits for the tree" -> "Max. Tiefe (≤ 100): Maximale Anzahl von Teilungen für den Baum"
-   "Basically flowcharts. You begin at the root node. Based on the value of one feature (or sometimes more), we go to the left or right child of the tree. Et cetera, until we arrive at a leaf node, and then we make a prediction based on that leaf." -> "Im Grunde genommen Flussdiagramme. Sie beginnen am Wurzelknoten. Basierend auf dem Wert eines Merkmals (oder manchmal auch mehrerer) gehen wir zum linken oder rechten Kind des Baumes. Und so weiter, bis wir an einem Blattknoten ankommen, und dann treffen wir eine Vorhersage auf der Grundlage dieses Blattes."
-   "It's easy to follow a tree once you've constructed one - it's a very simple chain of 'yes/no's and true/falses. The interesting part is obviously making the tree." -> "Es ist einfach, einem Baum zu folgen, wenn man ihn einmal konstruiert hat - es ist eine sehr einfache Kette von 'Ja/Nein's und Wahr/Falsch. Der interessante Teil ist offensichtlich, den Baum zu erstellen."
-   "There are various algorithms for making trees out there, but in general all work towards minimizing entropy. Not the physical kind, but the Informational kind. In the context of a decision tree and nodes, entropy is high when points in a 'bucket' vary a lot in terms of their labels. If we have a tree that buckets equal numbers of orange and purple points together, this tree has high entropy and is bad. Vice versa - if we end up bucketing orange points together, and purple points separately, then there is low entropy, and this is a good tree." -> "Es gibt verschiedene Algorithmen zur Erstellung von Bäumen, aber im Allgemeinen arbeiten alle darauf hin, die Entropie zu minimieren. Nicht die physische Art, sondern die informationelle Art. Im Kontext eines Entscheidungsbaums und von Knoten ist die Entropie hoch, wenn die Punkte in einem 'Eimer' in Bezug auf ihre Bezeichnungen stark variieren. Wenn wir einen Baum haben, der die gleiche Anzahl von orangen und lila Punkten zusammenfasst, hat dieser Baum eine hohe Entropie und ist schlecht. Umgekehrt - wenn wir am Ende orangefarbene Punkte zusammenfassen und lila Punkte getrennt, dann ist die Entropie niedrig, und dies ist ein guter Baum."
-   "Popular techniques for using trees involves Boosting and Bagging." -> "Beliebte Techniken zur Verwendung von Bäumen sind Boosting und Bagging."
-   "Boosting involves training a large number of low-depth (ie high bias) trees that predict just above random chance - then, you intelligently let each small tree contribute towards a final, weighted prediction. This approach primarily lowers the bias of your model." -> "Boosting beinhaltet das Training einer großen Anzahl von Bäumen mit geringer Tiefe (d.h. hohem Bias), die knapp über dem Zufall vorhersagen - dann lassen Sie jeden kleinen Baum intelligent zu einer endgültigen, gewichteten Vorhersage beitragen. Dieser Ansatz senkt in erster Linie den Bias Ihres Modells."
-   "Bagging involves resampling the dataset - with your training data, we want to generate a new training set that's just a bit different from the original. We do this by randomly picking one out of n points in the original dataset - and we continue this for as many times as we need to form our new 'bag' of training data. Keep in mind the same datapoint is allowed to be picked more than once. This approach tackles variance in your model, and can reduce overfitting." -> "Bagging beinhaltet das Resampling des Datensatzes - mit Ihren Trainingsdaten möchten wir einen neuen Trainingssatz erstellen, der sich nur geringfügig vom Original unterscheidet. Wir tun dies, indem wir zufällig einen von n Punkten im ursprünglichen Datensatz auswählen - und wir setzen dies so oft fort, wie wir benötigen, um unseren neuen 'Beutel' mit Trainingsdaten zu bilden. Beachten Sie, dass derselbe Datenpunkt mehr als einmal ausgewählt werden darf. Dieser Ansatz bekämpft die Varianz in Ihrem Modell und kann eine Überanpassung reduzieren."
-   "The cool thing about bagging and boosting is that you usually don't have to worry about tradeoffs - boosting reduces bias without overfitting too much, and bagging reduces variance/overfitting without increasing bias too much. For a lot of machine learning, there's a tradeoff between bias and variance - so this ability to decrease one without significantly affecting the other makes bagging and boosting so powerful." -> "Das Coole an Bagging und Boosting ist, dass Sie sich normalerweise keine Gedanken über Kompromisse machen müssen - Boosting reduziert den Bias, ohne zu stark zu überanpassen, und Bagging reduziert die Varianz/Überanpassung, ohne den Bias zu stark zu erhöhen. Bei vielen maschinellen Lernverfahren gibt es einen Kompromiss zwischen Bias und Varianz - daher macht diese Fähigkeit, einen zu verringern, ohne den anderen wesentlich zu beeinflussen, Bagging und Boosting so leistungsstark."
-   "Note that bagging and boosting are general approaches that don't have to be specific to trees - it's just that trees are more commonly associated with them. You could reduce bias of any algorithm by boosting, and reduce its variance by bagging." -> "Beachten Sie, dass Bagging und Boosting allgemeine Ansätze sind, die nicht spezifisch für Bäume sein müssen - es ist nur so, dass Bäume häufiger mit ihnen in Verbindung gebracht werden. Sie könnten den Bias eines beliebigen Algorithmus durch Boosting reduzieren und seine Varianz durch Bagging."
-   "Very easy to implement and interpret" -> "Sehr einfach zu implementieren und zu interpretieren"
-   "Overfits if tree depth is too high" -> "Überanpassung, wenn die Baumtiefe zu hoch ist"
-   "Instable - if data differs by a little bit, the resulting tree can look drastically different, especially if trees have low depth." -> "Instabil - wenn sich die Daten geringfügig unterscheiden, kann der resultierende Baum drastisch anders aussehen, insbesondere wenn die Bäume eine geringe Tiefe haben."
-   "Decision boundaries are orthogonal - no drawing 'slanted' lines to separate classes" -> "Entscheidungsgrenzen sind orthogonal - kein Zeichnen von 'schrägen' Linien zur Trennung von Klassen"
-   "Wikipedia: Decision Tree" -> "Wikipedia: Entscheidungsbaum"
-   "Wikipedia: Bootstrap Aggregating (Bagging)" -> "Wikipedia: Bootstrap Aggregating (Bagging)"
-   "Introduction to Boosted Trees (XGBoost, a popular Boosted Tree library)" -> "Einführung in Boosted Trees (XGBoost, eine beliebte Boosted Tree-Bibliothek)"
