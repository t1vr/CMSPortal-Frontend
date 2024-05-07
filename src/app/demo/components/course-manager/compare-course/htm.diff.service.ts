// htmldiff.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmlDiffService {
  constructor() { }

  htmlToTokens(html: string): string[] {
    let mode = "char";
    let currentWord = "";
    const words: string[] = [];

    for (let i = 0; i < html.length; i++) {
      const char = html[i];

      switch (mode) {
        case "tag":
          if (char === ">") {
            currentWord += ">";
            words.push(currentWord);
            currentWord = "";
            if (this.isWhitespace(char)) {
              mode = "whitespace";
            } else {
              mode = "char";
            }
          } else {
            currentWord += char;
          }
          break;
        case "char":
          if (char === "<") {
            if (currentWord) {
              words.push(currentWord);
            }
            currentWord = "<";
            mode = "tag";
          } else if (/\s/.test(char)) {
            if (currentWord) {
              words.push(currentWord);
            }
            currentWord = char;
            mode = "whitespace";
          } else if (/[\w\#@]+/i.test(char)) {
            currentWord += char;
          } else {
            if (currentWord) {
              words.push(currentWord);
            }
            currentWord = char;
          }
          break;
        case "whitespace":
          if (char === "<") {
            if (currentWord) {
              words.push(currentWord);
            }
            currentWord = "<";
            mode = "tag";
          } else if (this.isWhitespace(char)) {
            currentWord += char;
          } else {
            if (currentWord) {
              words.push(currentWord);
            }
            currentWord = char;
            mode = "char";
          }
          break;
        default:
          throw new Error(`Unknown mode ${mode}`);
      }
    }

    if (currentWord) {
      words.push(currentWord);
    }

    return words;
  }

  isEndOfTag(char: string): boolean {
    return char === ">";
  }

  isStartOfTag(char: string): boolean {
    return char === "<";
  }

  isWhitespace(char: string): boolean {
    return /^\s+$/.test(char);
  }

  isTag(token: string): boolean {
    return /^\s*<[^>]+>\s*$/.test(token);
  }

  isntTag(token: string): boolean {
    return !(/^\s*<[^>]+>\s*$/.test(token));
  }

  findMatchingBlocks(beforeTokens: string[], afterTokens: string[]): Match[] {
    const index_of_before_locations_in_after_tokens = this.createIndex({ find_these: beforeTokens, in_these: afterTokens });
    const matching_blocks: Match[] = [];
    this.recursivelyFindMatchingBlocks(beforeTokens, afterTokens, index_of_before_locations_in_after_tokens, 0, beforeTokens.length, 0, afterTokens.length, matching_blocks);
    return matching_blocks;
  }

  findMatch(
    beforeTokens: string[],
    afterTokens: string[],
    index_of_before_locations_in_after_tokens: Record<string, number[]>,
    start_in_before: number,
    end_in_before: number,
    start_in_after: number,
    end_in_after: number
  ): Match {
    let best_match_in_before = start_in_before;
    let best_match_in_after = start_in_after;
    let best_match_length = 0;
    const match_length_at: Record<number, number> = {};

    for (let index_in_before = start_in_before; index_in_before < end_in_before; index_in_before++) {
      const new_match_length_at: Record<number, number> = {};
      const looking_for = beforeTokens[index_in_before];
      const locations_in_after = index_of_before_locations_in_after_tokens[looking_for];

      for (const index_in_after of locations_in_after) {
        if (index_in_after < start_in_after) {
          continue;
        }
        if (index_in_after >= end_in_after) {
          break;
        }
        if (match_length_at[index_in_after - 1] == null) {
          match_length_at[index_in_after - 1] = 0;
        }
        const new_match_length = match_length_at[index_in_after - 1] + 1;
        new_match_length_at[index_in_after] = new_match_length;

        if (new_match_length > best_match_length) {
          best_match_in_before = index_in_before - new_match_length + 1;
          best_match_in_after = index_in_after - new_match_length + 1;
          best_match_length = new_match_length;
        }
      }
      Object.assign(match_length_at, new_match_length_at);
    }

    if (best_match_length !== 0) {
      return new Match(best_match_in_before, best_match_in_after, best_match_length);
    }
    return null;
  }

  recursivelyFindMatchingBlocks(
    beforeTokens: string[],
    afterTokens: string[],
    index_of_before_locations_in_after_tokens: Record<string, number[]>,
    start_in_before: number,
    end_in_before: number,
    start_in_after: number,
    end_in_after: number,
    matching_blocks: Match[]
  ): Match[] {
    const match = this.findMatch(beforeTokens, afterTokens, index_of_before_locations_in_after_tokens, start_in_before, end_in_before, start_in_after, end_in_after);
    if (match !== null) {
      if (start_in_before < match.start_in_before && start_in_after < match.start_in_after) {
        this.recursivelyFindMatchingBlocks(beforeTokens, afterTokens, index_of_before_locations_in_after_tokens, start_in_before, match.start_in_before, start_in_after, match.start_in_after, matching_blocks);
      }
      matching_blocks.push(match);
      if (match.end_in_before <= end_in_before && match.end_in_after <= end_in_after) {
        this.recursivelyFindMatchingBlocks(beforeTokens, afterTokens, index_of_before_locations_in_after_tokens, match.end_in_before + 1, end_in_before, match.end_in_after + 1, end_in_after, matching_blocks);
      }
    }
    return matching_blocks;
  }

  createIndex(p: { find_these: string[]; in_these: string[] }): Record<string, number[]> {
    if (!p.find_these) {
      throw new Error("params must have find_these key");
    }
    if (!p.in_these) {
      throw new Error("params must have in_these key");
    }
    const index: Record<string, number[]> = {};
    p.find_these.forEach(token => {
      index[token] = [];
      let idx = p.in_these.indexOf(token);
      while (idx !== -1) {
        index[token].push(idx);
        idx = p.in_these.indexOf(token, idx + 1);
      }
    });
    return index;
  }

  calculateOperations(beforeTokens: string[], afterTokens: string[]): any[] {
    let position_in_before = 0;
    let position_in_after = 0;
    const operations: any[] = [];
    const action_map = {
      "false,false": "replace",
      "true,false": "insert",
      "false,true": "delete",
      "true,true": "none",
    };
    const matches = this.findMatchingBlocks(beforeTokens, afterTokens);
    matches.push(new Match(beforeTokens.length, afterTokens.length, 0));

    for (let index = 0; index < matches.length; index++) {
      const match = matches[index];
      const match_starts_at_current_position_in_before = position_in_before === match.start_in_before;
      const match_starts_at_current_position_in_after = position_in_after === match.start_in_after;
      const action_up_to_match_positions = action_map[[match_starts_at_current_position_in_before, match_starts_at_current_position_in_after].toString()];
      if (action_up_to_match_positions !== "none") {
        operations.push({
          action: action_up_to_match_positions,
          start_in_before: position_in_before,
          end_in_before: action_up_to_match_positions !== "insert" ? match.start_in_before - 1 : undefined,
          start_in_after: position_in_after,
          end_in_after: action_up_to_match_positions !== "delete" ? match.start_in_after - 1 : undefined,
        });
      }
      if (match.length !== 0) {
        operations.push({
          action: "equal",
          start_in_before: match.start_in_before,
          end_in_before: match.end_in_before,
          start_in_after: match.start_in_after,
          end_in_after: match.end_in_after,
        });
      }
      position_in_before = match.end_in_before + 1;
      position_in_after = match.end_in_after + 1;
    }

    const post_processed: any[] = [];
    let last_op = {
      action: "none",
      end_in_before: 0,
      end_in_after: 0
    };

    const is_single_whitespace = (op: any) => {
      if (op.action !== "equal") {
        return false;
      }
      if (op.end_in_before - op.start_in_before !== 0) {
        return false;
      }
      return /^\s$/.test(beforeTokens.slice(op.start_in_before, op.end_in_before + 1).join(""));
    };

    for (const op of operations) {
      if (
        (is_single_whitespace(op) && last_op.action === "replace") ||
        (op.action === "replace" && last_op.action === "replace")
      ) {
        last_op.end_in_before = op.end_in_before;
        last_op.end_in_after = op.end_in_after;
      } else {
        post_processed.push(op);
        last_op = op;
      }
    }

    return post_processed;
  }

  consecutiveWhere<T>(start: number, content: T[], predicate: (item: T) => boolean): T[] {
    const contentSlice = content.slice(start);
    let last_matching_index;
    for (let index = 0; index < contentSlice.length; index++) {
      const item = contentSlice[index];
      const answer = predicate(item);
      if (answer === true) {
        last_matching_index = index;
      }
      if (answer === false) {
        break;
      }
    }
    if (last_matching_index !== undefined) {
      return contentSlice.slice(0, last_matching_index + 1);
    }
    return [];
  }

  wrap(tag: string, content: string[]): string {
    let rendering = "";
    let position = 0;
    const length = content.length;
    while (true) {
      if (position >= length) {
        break;
      }
      const non_tags = this.consecutiveWhere(position, content, this.isntTag);
      position += non_tags.length;
      if (non_tags.length !== 0) {
        rendering += `<${tag}>${non_tags.join("")}</${tag}>`;
      }
      if (position >= length) {
        break;
      }
      const tags = this.consecutiveWhere(position, content, this.isTag);
      position += tags.length;
      rendering += tags.join("");
    }
    return rendering;
  }

  renderOperations(beforeTokens: string[], afterTokens: string[], operations: any[]): string {
    let rendering = "";
    for (const op of operations) {
      rendering += this.opMap[op.action](op, beforeTokens, afterTokens);
    }
    return rendering;
  }

  diff(before: string, after: string): string {
    if (before === after) {
      return before;
    }
    const beforeTokens = this.htmlToTokens(before);
    const afterTokens = this.htmlToTokens(after);
    const ops = this.calculateOperations(beforeTokens, afterTokens);
    return this.renderOperations(beforeTokens, afterTokens, ops);
  }

  private opMap = {
    equal: (op: any, beforeTokens: string[], afterTokens: string[]) => {
      return beforeTokens.slice(op.start_in_before, op.end_in_before + 1).join("");
    },
    insert: (op: any, beforeTokens: string[], afterTokens: string[]) => {
      const val = afterTokens.slice(op.start_in_after, op.end_in_after + 1);
      return this.wrap("ins", val);
    },
    delete: (op: any, beforeTokens: string[], afterTokens: string[]) => {
      const val = beforeTokens.slice(op.start_in_before, op.end_in_before + 1);
      return this.wrap("del", val);
    },
    replace: (op: any, beforeTokens: string[], afterTokens: string[]) => {
      return this.opMap.delete(op, beforeTokens, afterTokens) + this.opMap.insert(op, beforeTokens, afterTokens);
    },
  };
}

class Match {
  start_in_before: number;
  start_in_after: number;
  length: number;
  end_in_before: number;
  end_in_after: number;

  constructor(start_in_before: number, start_in_after: number, length: number) {
    this.start_in_before = start_in_before;
    this.start_in_after = start_in_after;
    this.length = length;
    this.end_in_before = this.start_in_before + this.length - 1;
    this.end_in_after = this.start_in_after + this.length - 1;
  }
}
