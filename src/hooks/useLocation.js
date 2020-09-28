import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { useState, useEffect } from 'react';

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null)
    const [subscriber, setSubscriber] = useState(null)
    console.log(shouldTrack);
    const startWatching = async () => {
        try {
            const { granted } = await requestPermissionsAsync();

            if (!granted) {
                throw new Error('Location permission not granted');

            }
            const sub = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            },
                callback
            ).then(sub => {
                setSubscriber(sub)
            })

        } catch (e) {
            setErr(e);
        }



    };
    useEffect(() => {
        if (shouldTrack) {
            startWatching();
        } else {
            subscriber.remove();
            setSubscriber(null);
        }
    }, [shouldTrack]);

    return [err];
}