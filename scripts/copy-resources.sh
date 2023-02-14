#!/bin/bash

if [ ! -f "dist/common/firebase/serviceAccount.json" ]; then
  cp src/common/firebase/serviceAccount.json dist/common/firebase/serviceAccount.json
fi