#!/usr/bin/env ts-node
import { writeFileSync } from 'fs'
import wdk from '../src/wellknown/wikidata.org.js'
import type { Entity } from '../src/index.js'

const [ url ] = wdk.getManyEntities({
  ids: [
    'Q1',
    'Q571',
    'Q2112',
    'Q217447',
    'Q271094',
    'Q275937',
    'Q328212',
    'Q646148',
    'Q970917',
    'Q4115189',
    'Q4132785',
    'Q19180293',
    'Q22002395',

    'L525',
    'P8098',
  ],
})

doit()
async function doit () {
  const response = await fetch(url)
  const body = await response.json() as {
    entities: Readonly<Record<string, Entity>>;
  }

  for (const [ id, entity ] of Object.entries(body.entities)) {
    let text = `export const ${id} = `
    text += JSON.stringify(entity, undefined, '  ')
    text += 'as const\n'
    writeFileSync(`tests/data/${id}.ts`, text, 'utf8')
  }

  console.log('remember to run npm run lint-fix afterwards')
}
