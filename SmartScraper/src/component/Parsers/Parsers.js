const LatexParser = require("./LatexParser");

/**
 * Add functionality to parse fractions using the class above.
 */
class FractionParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse a fraction from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed fraction.
   */
  parseFraction(latexDoc) {
    const fraction = latexDoc.match(/\\frac\{[^}]+\}\{[^}]+\}/);
    if (fraction) {
      const numerator = fraction[0].match(/\\frac\{([^}]+)\}\{[^}]+\}/)[1];
      const denominator = fraction[0].match(/\\frac\{[^}]+\}\{([^}]+)\}/)[1];
      return `${numerator}/${denominator}`;
    }
    return "Invalid fraction.";
  }
}

/**
 * Add functionality to parse square roots using the class above.
 */
class SquareRootParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse a square root from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed square root.
   */
  parseSquareRoot(latexDoc) {
    const squareRoot = latexDoc.match(/\\sqrt\{[^}]+\}/);
    if (squareRoot) {
      const radicand = squareRoot[0].match(/\\sqrt\{([^}]+)\}/)[1];
      return `√${radicand}`;
    }
    return "Invalid square root.";
  }
}

/**
 * Add functionality to parse exponents using the class above.
 */
class ExponentParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse an exponent from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed exponent.
   */
  parseExponent(latexDoc) {
    const exponent = latexDoc.match(/[a-zA-Z]+\^\{[^}]+\}/);
    if (exponent) {
      const base = exponent[0].match(/([a-zA-Z]+)\^\{[^}]+\}/)[1];
      const power = exponent[0].match(/[a-zA-Z]+\^\{([^}]+)\}/)[1];
      return `${base}^${power}`;
    }
    return "Invalid exponent.";
  }
}

/**
 * Add functionality to parse subscripts using the class above.
 */
class SubscriptParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse a subscript from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed subscript.
   */
  parseSubscript(latexDoc) {
    const subscript = latexDoc.match(/[a-zA-Z]+_\{[^}]+\}/);
    if (subscript) {
      const base = subscript[0].match(/([a-zA-Z]+)_\{[^}]+\}/)[1];
      const index = subscript[0].match(/[a-zA-Z]+_\{([^}]+)\}/)[1];
      return `${base}_${index}`;
    }
    return "Invalid subscript.";
  }
}

/**
 * Add functionality to parse integrals using the class above.
 */
class IntegralParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse an integral from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed integral.
   */
  parseIntegral(latexDoc) {
    const integral = latexDoc.match(/\\int\_\{[^}]+\}\^\{[^}]+\}\{[^}]+\}/);
    if (integral) {
      const lowerBound = integral[0].match(
        /\\int\_\{([^}]+)\}\^\{[^}]+\}\{[^}]+\}/
      )[1];
      const upperBound = integral[0].match(
        /\\int\_\{[^}]+\}\^\{([^}]+)\}\{[^}]+\}/
      )[1];
      const functionToIntegrate = integral[0].match(
        /\\int\_\{[^}]+\}\^\{[^}]+\}\{([^}]+)\}/
      )[1];
      return `∫${lowerBound}^${upperBound}${functionToIntegrate}`;
    }
    return "Invalid integral.";
  }
}

/**
 * Add functionality to parse summations using the class above.
 */
class SummationParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse a summation from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed summation.
   */
  parseSummation(latexDoc) {
    const summation = latexDoc.match(/\\sum\_\{[^}]+\}\^\{[^}]+\}\{[^}]+\}/);
    if (summation) {
      const lowerBound = summation[0].match(
        /\\sum\_\{([^}]+)\}\^\{[^}]+\}\{[^}]+\}/
      )[1];
      const upperBound = summation[0].match(
        /\\sum\_\{[^}]+\}\^\{([^}]+)\}\{[^}]+\}/
      )[1];
      const functionToSum = summation[0].match(
        /\\sum\_\{[^}]+\}\^\{[^}]+\}\{([^}]+)\}/
      )[1];
      return `∑${lowerBound}^${upperBound}${functionToSum}`;
    }
    return "Invalid summation.";
  }
}

/**
 * Add functionality to parse products using the class above.
 */
class ProductParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse a product from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed product.
   */
  parseProduct(latexDoc) {
    const product = latexDoc.match(/\\prod\_\{[^}]+\}\^\{[^}]+\}\{[^}]+\}/);
    if (product) {
      const lowerBound = product[0].match(
        /\\prod\_\{([^}]+)\}\^\{[^}]+\}\{[^}]+\}/
      )[1];
      const upperBound = product[0].match(
        /\\prod\_\{[^}]+\}\^\{([^}]+)\}\{[^}]+\}/
      )[1];
      const functionToProduct = product[0].match(
        /\\prod\_\{[^}]+\}\^\{[^}]+\}\{([^}]+)\}/
      )[1];
      return `∏${lowerBound}^${upperBound}${functionToProduct}`;
    }
    return "Invalid product.";
  }
}

/**
 * Add functionality to parse limits using the class above.
 */
class LimitParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse a limit from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed limit.
   */
  parseLimit(latexDoc) {
    const limit = latexDoc.match(/\\lim\_\{[^}]+\}\{[^}]+\}/);
    if (limit) {
      const variable = limit[0].match(/\\lim\_\{([^}]+)\}\{[^}]+\}/)[1];
      const functionToLimit = limit[0].match(/\\lim\_\{[^}]+\}\{([^}]+)\}/)[1];
      return `lim${variable}→∞${functionToLimit}`;
    }
    return "Invalid limit.";
  }
}

/**
 * Add functionality to parse matrices using the class above.
 */
class MatrixParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse a matrix from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed matrix.
   */
  parseMatrix(latexDoc) {
    const matrix = latexDoc.match(/\\begin\{matrix\}.*\\end\{matrix\}/s);
    if (matrix) {
      const matrixRows = matrix[0]
        .match(/\\begin\{matrix\}(.*)\\end\{matrix\}/s)[1]
        .split("\\\\");
      const matrixColumns = matrixRows.map((row) => row.split("&"));
      return matrixColumns;
    }
    return "Invalid matrix.";
  }
}

/**
 * Add functionality to parse vectors using the class above.
 */
class VectorParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse a vector from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed vector.
   */
  parseVector(latexDoc) {
    const vector = latexDoc.match(/\\begin\{bmatrix\}.*\\end\{bmatrix\}/s);
    if (vector) {
      const vectorRows = vector[0]
        .match(/\\begin\{bmatrix\}(.*)\\end\{bmatrix\}/s)[1]
        .split("\\\\");
      const vectorColumns = vectorRows.map((row) => row.split("&"));
      return vectorColumns;
    }
    return "Invalid vector.";
  }
}

/**
 * Add functionality to parse determinants using the class above.
 */
class DeterminantParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse a determinant from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed determinant.
   */
  parseDeterminant(latexDoc) {
    const determinant = latexDoc.match(/\\begin\{vmatrix\}.*\\end\{vmatrix\}/s);
    if (determinant) {
      const determinantRows = determinant[0]
        .match(/\\begin\{vmatrix\}(.*)\\end\{vmatrix\}/s)[1]
        .split("\\\\");
      const determinantColumns = determinantRows.map((row) => row.split("&"));
      return determinantColumns;
    }
    return "Invalid determinant.";
  }
}

/**
 * Add functionality to parse sets using the class above.
 */
class SetParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse a set from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed set.
   */
  parseSet(latexDoc) {
    const set = latexDoc.match(/\\begin\{Bmatrix\}.*\\end\{Bmatrix\}/s);
    if (set) {
      const setRows = set[0]
        .match(/\\begin\{Bmatrix\}(.*)\\end\{Bmatrix\}/s)[1]
        .split("\\\\");
      const setColumns = setRows.map((row) => row.split("&"));
      return setColumns;
    }
    return "Invalid set.";
  }
}

/**
 * Add functionality to parse cases using the class above.
 */
class CaseParser extends LatexParser {
  constructor(latexDoc) {
    super(latexDoc);
  }

  /**
   * Parse a case from a LaTeX document.
   * @param {string} latexDoc - The LaTeX document to parse.
   * @returns {string} The parsed case.
   */
  parseCase(latexDoc) {
    const case_ = latexDoc.match(/\\begin\{cases\}.*\\end\{cases\}/s);
    if (case_) {
      const caseRows = case_[0]
        .match(/\\begin\{cases\}(.*)\\end\{cases\}/s)[1]
        .split("\\\\");
      const caseColumns = caseRows.map((row) => row.split("&"));
      return caseColumns;
    }
    return "Invalid case.";
  }
}
