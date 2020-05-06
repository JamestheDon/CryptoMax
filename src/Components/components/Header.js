/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use strict';
import Colors from './Colors';
import type {Node} from '../../../node_modules/react';
import {Text, StyleSheet, ImageBackground} from 'react-native';
import React from '../../../node_modules/react';

const Header = (): Node => (
  <ImageBackground
    accessibilityRole={'image'}
    source={require('./PrimoLogo2_500x500.png')}
    style={styles.background}
    imageStyle={styles.logo}
  />
);

const styles = StyleSheet.create({
  background: {
    paddingBottom: 100,
    paddingTop: 40,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
  logo: {
    opacity: 0.4,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: 0,
    marginBottom: -100,
  },
  text: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.black,
  },
});

export default Header;
